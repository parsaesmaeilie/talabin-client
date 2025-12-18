"""
Serializers for prices app.
"""
from rest_framework import serializers
from .models import GoldPrice, PriceHistory


class GoldPriceSerializer(serializers.ModelSerializer):
    """Serializer for GoldPrice model."""

    spread = serializers.SerializerMethodField()

    class Meta:
        model = GoldPrice
        fields = [
            'id', 'buy_price', 'sell_price', 'spread',
            'is_active', 'source', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def get_spread(self, obj):
        """Calculate spread between buy and sell prices."""
        return obj.sell_price - obj.buy_price


class PriceHistorySerializer(serializers.ModelSerializer):
    """Serializer for PriceHistory model."""

    class Meta:
        model = PriceHistory
        fields = ['timestamp', 'price', 'source']
        read_only_fields = fields
