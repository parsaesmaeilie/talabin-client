"""
Models for gold price management.
"""
from django.db import models
from apps.core.models import TimeStampedModel


class GoldPrice(TimeStampedModel):
    """Gold price model."""

    buy_price = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='قیمت خرید (تومان)'
    )
    sell_price = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='قیمت فروش (تومان)'
    )
    is_active = models.BooleanField(default=True, verbose_name='فعال')
    source = models.CharField(max_length=100, blank=True, verbose_name='منبع')

    class Meta:
        verbose_name = 'قیمت طلا'
        verbose_name_plural = 'قیمت‌های طلا'
        db_table = 'gold_prices'
        ordering = ['-created_at']

    def __str__(self):
        return f"خرید: {self.buy_price:,} - فروش: {self.sell_price:,}"

    def save(self, *args, **kwargs):
        """Set all other prices to inactive when a new active price is saved."""
        if self.is_active:
            GoldPrice.objects.filter(is_active=True).update(is_active=False)
        super().save(*args, **kwargs)


class PriceHistory(TimeStampedModel):
    """Historical gold price data for charts."""

    timestamp = models.DateTimeField(auto_now_add=True, verbose_name='زمان')
    price = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='قیمت (تومان)'
    )
    source = models.CharField(max_length=100, blank=True, verbose_name='منبع')

    class Meta:
        verbose_name = 'تاریخچه قیمت'
        verbose_name_plural = 'تاریخچه قیمت‌ها'
        db_table = 'price_history'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['-timestamp']),
        ]

    def __str__(self):
        return f"{self.price:,} - {self.timestamp}"
