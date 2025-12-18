"""
Serializers for transactions app.
"""
from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for Transaction model."""

    transaction_type_display = serializers.CharField(
        source='get_transaction_type_display',
        read_only=True
    )
    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )

    class Meta:
        model = Transaction
        fields = [
            'id', 'transaction_type', 'transaction_type_display', 'status',
            'status_display', 'amount_irr', 'amount_gold', 'description',
            'reference_id', 'created_at'
        ]
        read_only_fields = fields
