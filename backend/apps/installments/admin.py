"""
Admin configuration for installments app.
"""
from django.contrib import admin
from .models import InstallmentPlan, Installment, InstallmentPayment


@admin.register(InstallmentPlan)
class InstallmentPlanAdmin(admin.ModelAdmin):
    """Admin interface for InstallmentPlan model."""

    list_display = [
        'name', 'duration_months', 'interest_rate',
        'min_amount', 'max_amount', 'is_active'
    ]
    list_filter = ['is_active', 'duration_months']
    search_fields = ['name', 'description']


@admin.register(Installment)
class InstallmentAdmin(admin.ModelAdmin):
    """Admin interface for Installment model."""

    list_display = [
        'user', 'plan', 'total_amount', 'monthly_payment',
        'status', 'start_date', 'end_date'
    ]
    list_filter = ['status', 'start_date']
    search_fields = ['user__phone_number', 'plan__name']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(InstallmentPayment)
class InstallmentPaymentAdmin(admin.ModelAdmin):
    """Admin interface for InstallmentPayment model."""

    list_display = [
        'installment', 'payment_number', 'amount',
        'due_date', 'paid_date', 'status'
    ]
    list_filter = ['status', 'due_date']
    search_fields = ['installment__user__phone_number', 'transaction_id']
    readonly_fields = ['created_at', 'updated_at']
