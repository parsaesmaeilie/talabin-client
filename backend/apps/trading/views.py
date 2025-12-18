"""
Views for trading app.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.utils import timezone
from django.conf import settings
from decimal import Decimal

from .models import Order
from .serializers import OrderSerializer, CreateOrderSerializer, OrderSummarySerializer
from apps.wallet.models import Wallet, WalletTransaction
from apps.prices.models import GoldPrice
from apps.core.utils import generate_transaction_id, calculate_fee
from apps.core.exceptions import InsufficientBalanceException


class OrderViewSet(viewsets.ModelViewSet):
    """ViewSet for order operations."""

    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return current user's orders."""
        return Order.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def preview(self, request):
        """Preview order before placing."""
        serializer = CreateOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order_type = serializer.validated_data['order_type']
        amount_irr = serializer.validated_data['amount_irr']

        # Get current gold price
        try:
            current_price = GoldPrice.objects.filter(is_active=True).latest('created_at')
            gold_price = current_price.sell_price if order_type == 'buy' else current_price.buy_price
        except GoldPrice.DoesNotExist:
            return Response({
                'success': False,
                'error': {'message': 'قیمت طلا در دسترس نیست'}
            }, status=status.HTTP_400_BAD_REQUEST)

        # Calculate gold amount
        gold_amount = amount_irr / gold_price

        # Calculate fee
        fee = calculate_fee(amount_irr, settings.TRANSACTION_FEE_PERCENTAGE)

        # Calculate total
        if order_type == 'buy':
            total_amount = amount_irr + fee
        else:
            total_amount = amount_irr - fee

        # Return preview
        preview_data = {
            'order_type': order_type,
            'amount_irr': amount_irr,
            'gold_price_per_gram': gold_price,
            'gold_amount': round(gold_amount, 4),
            'fee': fee,
            'total_amount': total_amount
        }

        return Response({
            'success': True,
            'data': preview_data
        })

    @action(detail=False, methods=['post'])
    @transaction.atomic
    def place_order(self, request):
        """Place a new order."""
        serializer = CreateOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order_type = serializer.validated_data['order_type']
        amount_irr = serializer.validated_data['amount_irr']

        # Get current gold price
        try:
            current_price = GoldPrice.objects.filter(is_active=True).latest('created_at')
            gold_price = current_price.sell_price if order_type == 'buy' else current_price.buy_price
        except GoldPrice.DoesNotExist:
            return Response({
                'success': False,
                'error': {'message': 'قیمت طلا در دسترس نیست'}
            }, status=status.HTTP_400_BAD_REQUEST)

        # Calculate gold amount
        gold_amount = amount_irr / gold_price

        # Get or create wallet
        wallet, _ = Wallet.objects.get_or_create(user=request.user)

        # Generate order number
        order_number = generate_transaction_id()

        # Create order
        order = Order.objects.create(
            user=request.user,
            order_type=order_type,
            gold_amount=gold_amount,
            gold_price_per_gram=gold_price,
            amount_irr=amount_irr,
            order_number=order_number
        )

        # Calculate totals
        order.calculate_totals()
        order.save()

        # Process order based on type
        try:
            if order_type == 'buy':
                # Check IRR balance
                if wallet.available_balance_irr < order.total_amount:
                    raise InsufficientBalanceException()

                # Deduct IRR and add gold
                wallet.deduct_balance(amount_irr=order.total_amount)
                wallet.add_balance(amount_gold=gold_amount)

                # Create transaction
                WalletTransaction.objects.create(
                    wallet=wallet,
                    transaction_type='buy_gold',
                    status='completed',
                    amount_irr=order.total_amount,
                    amount_gold=gold_amount,
                    description=f'خرید {gold_amount} گرم طلا',
                    reference_id=order_number
                )

            else:  # sell
                # Check gold balance
                if wallet.available_gold_balance < gold_amount:
                    raise InsufficientBalanceException('موجودی طلا ناکافی است')

                # Deduct gold and add IRR
                wallet.deduct_balance(amount_gold=gold_amount)
                wallet.add_balance(amount_irr=order.total_amount)

                # Create transactions
                WalletTransaction.objects.create(
                    wallet=wallet,
                    transaction_type='sell_gold',
                    status='completed',
                    amount_irr=order.total_amount,
                    amount_gold=gold_amount,
                    description=f'فروش {gold_amount} گرم طلا',
                    reference_id=order_number
                )

            # Update order status
            order.status = 'completed'
            order.executed_at = timezone.now()
            order.save()

            return Response({
                'success': True,
                'message': 'سفارش با موفقیت انجام شد',
                'data': OrderSerializer(order).data
            }, status=status.HTTP_201_CREATED)

        except InsufficientBalanceException as e:
            order.status = 'failed'
            order.save()
            raise

    @action(detail=True, methods=['post'])
    @transaction.atomic
    def cancel(self, request, pk=None):
        """Cancel an order."""
        order = self.get_object()

        if order.status != 'pending':
            return Response({
                'success': False,
                'error': {'message': 'فقط سفارشات در انتظار را می‌توان لغو کرد'}
            }, status=status.HTTP_400_BAD_REQUEST)

        order.status = 'cancelled'
        order.cancelled_at = timezone.now()
        order.save()

        return Response({
            'success': True,
            'message': 'سفارش لغو شد',
            'data': OrderSerializer(order).data
        })
