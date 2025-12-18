"""
Trading models for buy/sell operations.
"""
from django.db import models
from django.conf import settings
from apps.core.models import TimeStampedModel
from decimal import Decimal


class Order(TimeStampedModel):
    """Order model for buying and selling gold."""

    ORDER_TYPE_CHOICES = [
        ('buy', 'خرید'),
        ('sell', 'فروش'),
    ]

    STATUS_CHOICES = [
        ('pending', 'در انتظار'),
        ('processing', 'در حال پردازش'),
        ('completed', 'تکمیل شده'),
        ('failed', 'ناموفق'),
        ('cancelled', 'لغو شده'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='orders',
        verbose_name='کاربر'
    )
    order_type = models.CharField(
        max_length=10,
        choices=ORDER_TYPE_CHOICES,
        verbose_name='نوع سفارش'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='وضعیت'
    )

    # Gold details
    gold_amount = models.DecimalField(
        max_digits=12,
        decimal_places=4,
        verbose_name='مقدار طلا (گرم)'
    )
    gold_price_per_gram = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='قیمت هر گرم (تومان)'
    )

    # Financial details
    amount_irr = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='مبلغ کل (تومان)'
    )
    fee = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0,
        verbose_name='کارمزد'
    )
    total_amount = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='مبلغ نهایی'
    )

    # Reference
    order_number = models.CharField(
        max_length=50,
        unique=True,
        verbose_name='شماره سفارش'
    )

    # Timestamps
    executed_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ اجرا')
    cancelled_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ لغو')

    class Meta:
        verbose_name = 'سفارش'
        verbose_name_plural = 'سفارشات'
        db_table = 'orders'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at'], name='user_created_idx'),
            models.Index(fields=['status', '-created_at'], name='status_created_idx'),
            models.Index(fields=['order_type', 'status'], name='type_status_idx'),
            models.Index(fields=['order_number'], name='order_number_idx'),
        ]

    def __str__(self):
        return f"{self.get_order_type_display()} - {self.user.phone_number} - {self.order_number}"

    def calculate_totals(self):
        """Calculate fee and total amount."""
        fee_percentage = getattr(settings, 'TRANSACTION_FEE_PERCENTAGE', 0.5)
        self.fee = (self.amount_irr * Decimal(str(fee_percentage))) / 100

        if self.order_type == 'buy':
            self.total_amount = self.amount_irr + self.fee
        else:  # sell
            self.total_amount = self.amount_irr - self.fee
