"""
Serializers for trading app.
"""
from rest_framework import serializers
from .models import Order
from decimal import Decimal


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for Order model."""

    order_type_display = serializers.CharField(source='get_order_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_type', 'order_type_display', 'status', 'status_display',
            'gold_amount', 'gold_price_per_gram', 'amount_irr', 'fee',
            'total_amount', 'order_number', 'created_at', 'executed_at'
        ]
        read_only_fields = fields


class CreateOrderSerializer(serializers.Serializer):
    """Serializer for creating a new order."""

    order_type = serializers.ChoiceField(choices=['buy', 'sell'])
    amount_irr = serializers.DecimalField(
        max_digits=15,
        decimal_places=2,
        min_value=Decimal('1000'),
        max_value=Decimal('1000000000'),
        error_messages={
            'min_value': 'مبلغ باید بیشتر از ۱,۰۰۰ تومان باشد.',
            'max_value': 'مبلغ نمی‌تواند بیشتر از ۱,۰۰۰,۰۰۰,۰۰۰ تومان باشد.',
            'invalid': 'مبلغ وارد شده نامعتبر است.',
        }
    )

    def validate_amount_irr(self, value):
        """Validate order amount."""
        from django.conf import settings

        # Check if amount is zero or negative
        if value <= 0:
            raise serializers.ValidationError('مبلغ باید بیشتر از صفر باشد.')

        # Check minimum amount
        min_amount = getattr(settings, 'MIN_PURCHASE_AMOUNT', 100000)
        if value < min_amount:
            raise serializers.ValidationError(f'حداقل مبلغ معامله {min_amount:,} تومان است.')

        # Check if amount is reasonable (must be multiple of 1000)
        if value % 1000 != 0:
            raise serializers.ValidationError('مبلغ باید مضربی از ۱,۰۰۰ تومان باشد.')

        return value


class OrderSummarySerializer(serializers.Serializer):
    """Serializer for order summary/preview."""

    order_type = serializers.ChoiceField(choices=['buy', 'sell'])
    amount_irr = serializers.DecimalField(max_digits=15, decimal_places=2)
    gold_price_per_gram = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
    gold_amount = serializers.DecimalField(max_digits=12, decimal_places=4, read_only=True)
    fee = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
