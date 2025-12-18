"""
Admin configuration for prices app.
"""
from django.contrib import admin
from .models import GoldPrice, PriceHistory


@admin.register(GoldPrice)
class GoldPriceAdmin(admin.ModelAdmin):
    """Admin interface for GoldPrice model."""

    list_display = ['buy_price', 'sell_price', 'is_active', 'source', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['source']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']


@admin.register(PriceHistory)
class PriceHistoryAdmin(admin.ModelAdmin):
    """Admin interface for PriceHistory model."""

    list_display = ['timestamp', 'price', 'source']
    list_filter = ['timestamp']
    search_fields = ['source']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-timestamp']
