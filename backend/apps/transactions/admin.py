"""
Admin configuration for transactions app.
"""
from django.contrib import admin
from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    """Admin interface for Transaction model."""

    list_display = [
        'reference_id', 'user', 'transaction_type', 'status',
        'amount_irr', 'amount_gold', 'created_at'
    ]
    list_filter = ['transaction_type', 'status', 'created_at']
    search_fields = ['user__phone_number', 'reference_id', 'description']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
