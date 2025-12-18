"""
Serializers for installments app.
"""
from rest_framework import serializers
from .models import InstallmentPlan, Installment, InstallmentPayment


class InstallmentPlanSerializer(serializers.ModelSerializer):
    """Serializer for InstallmentPlan model."""

    class Meta:
        model = InstallmentPlan
        fields = [
            'id', 'name', 'description', 'duration_months', 'interest_rate',
            'min_amount', 'max_amount', 'is_active'
        ]
        read_only_fields = ['id']


class InstallmentPaymentSerializer(serializers.ModelSerializer):
    """Serializer for InstallmentPayment model."""

    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = InstallmentPayment
        fields = [
            'id', 'payment_number', 'amount', 'due_date', 'paid_date',
            'status', 'status_display', 'transaction_id'
        ]
        read_only_fields = fields


class InstallmentSerializer(serializers.ModelSerializer):
    """Serializer for Installment model."""

    plan_details = InstallmentPlanSerializer(source='plan', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    payments = InstallmentPaymentSerializer(many=True, read_only=True)
    paid_count = serializers.SerializerMethodField()
    remaining_count = serializers.SerializerMethodField()

    class Meta:
        model = Installment
        fields = [
            'id', 'plan', 'plan_details', 'total_amount', 'monthly_payment',
            'status', 'status_display', 'start_date', 'end_date',
            'paid_count', 'remaining_count', 'payments', 'created_at'
        ]
        read_only_fields = [
            'id', 'monthly_payment', 'status', 'created_at'
        ]

    def get_paid_count(self, obj):
        """Get number of paid installments."""
        return obj.payments.filter(status='paid').count()

    def get_remaining_count(self, obj):
        """Get number of remaining installments."""
        return obj.payments.filter(status__in=['pending', 'overdue']).count()
