"""
Views for installments app.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db import transaction
from django.utils import timezone
from dateutil.relativedelta import relativedelta

from .models import InstallmentPlan, Installment, InstallmentPayment
from .serializers import (
    InstallmentPlanSerializer, InstallmentSerializer, InstallmentPaymentSerializer
)
from apps.wallet.models import Wallet
from apps.core.utils import generate_transaction_id
from apps.core.exceptions import InsufficientBalanceException


class InstallmentPlanViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for installment plans."""

    queryset = InstallmentPlan.objects.filter(is_active=True)
    serializer_class = InstallmentPlanSerializer
    permission_classes = [AllowAny]


class InstallmentViewSet(viewsets.ModelViewSet):
    """ViewSet for user installments."""

    serializer_class = InstallmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return current user's installments."""
        return Installment.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    @transaction.atomic
    def subscribe(self, request):
        """Subscribe to an installment plan."""
        plan_id = request.data.get('plan_id')
        total_amount = request.data.get('total_amount')

        # Get plan
        try:
            plan = InstallmentPlan.objects.get(id=plan_id, is_active=True)
        except InstallmentPlan.DoesNotExist:
            return Response({
                'success': False,
                'error': {'message': 'طرح یافت نشد'}
            }, status=status.HTTP_404_NOT_FOUND)

        # Validate amount
        if total_amount < plan.min_amount or total_amount > plan.max_amount:
            return Response({
                'success': False,
                'error': {'message': f'مبلغ باید بین {plan.min_amount:,} تا {plan.max_amount:,} تومان باشد'}
            }, status=status.HTTP_400_BAD_REQUEST)

        # Calculate monthly payment
        interest = (total_amount * plan.interest_rate) / 100
        total_with_interest = total_amount + interest
        monthly_payment = total_with_interest / plan.duration_months

        # Calculate dates
        start_date = timezone.now().date()
        end_date = start_date + relativedelta(months=plan.duration_months)

        # Create installment
        installment = Installment.objects.create(
            user=request.user,
            plan=plan,
            total_amount=total_with_interest,
            monthly_payment=monthly_payment,
            start_date=start_date,
            end_date=end_date
        )

        # Create payment schedule
        for i in range(plan.duration_months):
            due_date = start_date + relativedelta(months=i+1)
            InstallmentPayment.objects.create(
                installment=installment,
                payment_number=i+1,
                amount=monthly_payment,
                due_date=due_date
            )

        return Response({
            'success': True,
            'message': 'اشتراک با موفقیت ایجاد شد',
            'data': InstallmentSerializer(installment).data
        }, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    @transaction.atomic
    def pay(self, request, pk=None):
        """Pay an installment."""
        installment = self.get_object()
        payment_id = request.data.get('payment_id')

        # Get payment
        try:
            payment = installment.payments.get(id=payment_id, status='pending')
        except InstallmentPayment.DoesNotExist:
            return Response({
                'success': False,
                'error': {'message': 'قسط یافت نشد یا قبلاً پرداخت شده است'}
            }, status=status.HTTP_404_NOT_FOUND)

        # Check wallet balance
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        if wallet.available_balance_irr < payment.amount:
            raise InsufficientBalanceException()

        # Process payment
        wallet.deduct_balance(amount_irr=payment.amount)

        # Update payment
        payment.status = 'paid'
        payment.paid_date = timezone.now().date()
        payment.transaction_id = generate_transaction_id()
        payment.save()

        # Check if all payments are completed
        remaining = installment.payments.filter(status__in=['pending', 'overdue']).count()
        if remaining == 0:
            installment.status = 'completed'
            installment.save()

        return Response({
            'success': True,
            'message': 'قسط با موفقیت پرداخت شد',
            'data': InstallmentSerializer(installment).data
        })
