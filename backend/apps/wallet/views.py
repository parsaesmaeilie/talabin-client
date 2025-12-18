"""
Views for wallet app.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.conf import settings
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

from .models import Wallet, WalletTransaction, BankAccount, DepositRequest, WithdrawalRequest
from .serializers import (
    WalletSerializer, WalletTransactionSerializer, BankAccountSerializer,
    DepositRequestSerializer, WithdrawalRequestSerializer,
    CreateDepositSerializer, CreateWithdrawalSerializer
)
from apps.core.utils import generate_transaction_id
from apps.core.exceptions import InsufficientBalanceException


class WalletViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for wallet operations."""

    serializer_class = WalletSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return current user's wallet."""
        return Wallet.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def balance(self, request):
        """Get current wallet balance."""
        wallet, created = Wallet.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(wallet)

        return Response({
            'success': True,
            'data': serializer.data
        })

    @action(detail=False, methods=['get'])
    def transactions(self, request):
        """Get wallet transaction history."""
        wallet, created = Wallet.objects.get_or_create(user=request.user)

        # Filter by transaction type if provided
        transaction_type = request.query_params.get('type')
        transactions = wallet.transactions.all()

        if transaction_type:
            transactions = transactions.filter(transaction_type=transaction_type)

        # Pagination
        page = self.paginate_queryset(transactions)
        if page is not None:
            serializer = WalletTransactionSerializer(page, many=True)
            return self.get_paginated_response({
                'success': True,
                'data': serializer.data
            })

        serializer = WalletTransactionSerializer(transactions, many=True)
        return Response({
            'success': True,
            'data': serializer.data
        })


class BankAccountViewSet(viewsets.ModelViewSet):
    """ViewSet for bank account operations."""

    serializer_class = BankAccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return current user's bank accounts."""
        return BankAccount.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Set user when creating bank account."""
        # If this is set as default, unset others
        if serializer.validated_data.get('is_default', False):
            BankAccount.objects.filter(user=self.request.user, is_default=True).update(is_default=False)

        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """Create a new bank account."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response({
            'success': True,
            'message': 'حساب بانکی با موفقیت اضافه شد',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        """Update bank account."""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # If setting as default, unset others
        if serializer.validated_data.get('is_default', False):
            BankAccount.objects.filter(user=request.user, is_default=True).exclude(id=instance.id).update(is_default=False)

        self.perform_update(serializer)

        return Response({
            'success': True,
            'message': 'حساب بانکی با موفقیت بروزرسانی شد',
            'data': serializer.data
        })

    def destroy(self, request, *args, **kwargs):
        """Delete bank account."""
        instance = self.get_object()
        self.perform_destroy(instance)

        return Response({
            'success': True,
            'message': 'حساب بانکی با موفقیت حذف شد'
        }, status=status.HTTP_204_NO_CONTENT)


class DepositViewSet(viewsets.ModelViewSet):
    """ViewSet for deposit operations."""

    serializer_class = DepositRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return current user's deposits."""
        return DepositRequest.objects.filter(user=self.request.user)

    @method_decorator(ratelimit(key='user', rate='20/h', method='POST'))
    @action(detail=False, methods=['post'])
    def create_deposit(self, request):
        """Create a new deposit request."""
        serializer = CreateDepositSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        amount = serializer.validated_data['amount']
        payment_method = serializer.validated_data['payment_method']

        # Generate transaction ID
        transaction_id = generate_transaction_id()

        # Create deposit request
        deposit = DepositRequest.objects.create(
            user=request.user,
            amount=amount,
            payment_method=payment_method,
            transaction_id=transaction_id
        )

        # TODO: If online payment, redirect to payment gateway
        if payment_method == 'online':
            # payment_url = initiate_payment_gateway(deposit)
            payment_url = None
            return Response({
                'success': True,
                'message': 'درخواست واریز ایجاد شد',
                'data': {
                    'deposit': DepositRequestSerializer(deposit).data,
                    'payment_url': payment_url
                }
            }, status=status.HTTP_201_CREATED)

        return Response({
            'success': True,
            'message': 'درخواست واریز ایجاد شد. لطفاً مبلغ را به حساب زیر واریز کنید',
            'data': DepositRequestSerializer(deposit).data
        }, status=status.HTTP_201_CREATED)

    @method_decorator(ratelimit(key='user', rate='10/h', method='POST'))
    @action(detail=True, methods=['post'])
    def upload_receipt(self, request, pk=None):
        """Upload deposit receipt."""
        deposit = self.get_object()

        if deposit.status != 'pending':
            return Response({
                'success': False,
                'error': {'message': 'فقط می‌توانید برای درخواست‌های در انتظار رسید آپلود کنید'}
            }, status=status.HTTP_400_BAD_REQUEST)

        receipt_image = request.FILES.get('receipt_image')
        if not receipt_image:
            return Response({
                'success': False,
                'error': {'message': 'تصویر رسید الزامی است'}
            }, status=status.HTTP_400_BAD_REQUEST)

        deposit.receipt_image = receipt_image
        deposit.status = 'paid'
        deposit.save()

        return Response({
            'success': True,
            'message': 'رسید با موفقیت آپلود شد',
            'data': DepositRequestSerializer(deposit).data
        })


class WithdrawalViewSet(viewsets.ModelViewSet):
    """ViewSet for withdrawal operations."""

    serializer_class = WithdrawalRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return current user's withdrawals."""
        return WithdrawalRequest.objects.filter(user=self.request.user)

    @method_decorator(ratelimit(key='user', rate='10/h', method='POST'))
    @action(detail=False, methods=['post'])
    @transaction.atomic
    def create_withdrawal(self, request):
        """Create a new withdrawal request."""
        serializer = CreateWithdrawalSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        bank_account_id = serializer.validated_data['bank_account_id']
        amount = serializer.validated_data['amount']

        # Get bank account
        try:
            bank_account = BankAccount.objects.get(
                id=bank_account_id,
                user=request.user
            )
        except BankAccount.DoesNotExist:
            return Response({
                'success': False,
                'error': {'message': 'حساب بانکی یافت نشد'}
            }, status=status.HTTP_404_NOT_FOUND)

        # Get or create wallet
        wallet, created = Wallet.objects.get_or_create(user=request.user)

        # Check balance
        if wallet.available_balance_irr < amount:
            raise InsufficientBalanceException()

        # Calculate fee (you can customize this)
        fee = amount * settings.TRANSACTION_FEE_PERCENTAGE / 100

        # Generate transaction ID
        transaction_id = generate_transaction_id()

        # Freeze balance
        wallet.freeze_balance(amount_irr=amount)

        # Create withdrawal request
        withdrawal = WithdrawalRequest.objects.create(
            user=request.user,
            bank_account=bank_account,
            amount=amount,
            fee=fee,
            transaction_id=transaction_id
        )

        # Create wallet transaction
        WalletTransaction.objects.create(
            wallet=wallet,
            transaction_type='withdraw',
            status='pending',
            amount_irr=amount,
            description=f'درخواست برداشت به حساب {bank_account.bank_name}',
            reference_id=transaction_id
        )

        return Response({
            'success': True,
            'message': 'درخواست برداشت ثبت شد و در حال بررسی است',
            'data': WithdrawalRequestSerializer(withdrawal).data
        }, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    @transaction.atomic
    def cancel(self, request, pk=None):
        """Cancel a withdrawal request."""
        withdrawal = self.get_object()

        if withdrawal.status not in ['pending', 'approved']:
            return Response({
                'success': False,
                'error': {'message': 'فقط درخواست‌های در انتظار یا تایید شده را می‌توان لغو کرد'}
            }, status=status.HTTP_400_BAD_REQUEST)

        # Unfreeze balance
        wallet = Wallet.objects.get(user=request.user)
        wallet.unfreeze_balance(amount_irr=withdrawal.amount)

        # Update withdrawal status
        withdrawal.status = 'cancelled'
        withdrawal.save()

        # Update related transaction
        WalletTransaction.objects.filter(
            reference_id=withdrawal.transaction_id
        ).update(status='cancelled')

        return Response({
            'success': True,
            'message': 'درخواست برداشت لغو شد',
            'data': WithdrawalRequestSerializer(withdrawal).data
        })
