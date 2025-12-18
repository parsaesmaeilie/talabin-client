"""
Admin configuration for trading app.
"""
from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """Admin interface for Order model."""

    list_display = [
        'order_number', 'user', 'order_type', 'status', 'gold_amount',
        'amount_irr', 'fee', 'total_amount', 'created_at'
    ]
    list_filter = ['order_type', 'status', 'created_at']
    search_fields = ['order_number', 'user__phone_number', 'user__first_name', 'user__last_name']
    readonly_fields = ['created_at', 'updated_at', 'executed_at', 'cancelled_at']
    ordering = ['-created_at']

    fieldsets = (
        ('اطلاعات سفارش', {
            'fields': ('user', 'order_type', 'status', 'order_number')
        }),
        ('جزئیات طلا', {
            'fields': ('gold_amount', 'gold_price_per_gram')
        }),
        ('جزئیات مالی', {
            'fields': ('amount_irr', 'fee', 'total_amount')
        }),
        ('تاریخ‌ها', {
            'fields': ('created_at', 'updated_at', 'executed_at', 'cancelled_at')
        }),
    )
