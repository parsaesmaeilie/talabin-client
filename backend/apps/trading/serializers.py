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
    amount_irr = serializers.DecimalField(max_digits=15, decimal_places=2)

    def validate_amount_irr(self, value):
        """Validate order amount."""
        from django.conf import settings

        min_amount = getattr(settings, 'MIN_PURCHASE_AMOUNT', 100000)
        if value < min_amount:
            raise serializers.ValidationError(f'حداقل مبلغ معامله {min_amount:,} تومان است')

        return value


class OrderSummarySerializer(serializers.Serializer):
    """Serializer for order summary/preview."""

    order_type = serializers.ChoiceField(choices=['buy', 'sell'])
    amount_irr = serializers.DecimalField(max_digits=15, decimal_places=2)
    gold_price_per_gram = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
    gold_amount = serializers.DecimalField(max_digits=12, decimal_places=4, read_only=True)
    fee = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
