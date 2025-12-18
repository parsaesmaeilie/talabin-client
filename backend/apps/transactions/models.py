"""
Transaction models (comprehensive transaction history).
"""
from django.db import models
from django.conf import settings
from apps.core.models import TimeStampedModel


class Transaction(TimeStampedModel):
    """Unified transaction model for all types of transactions."""

    TRANSACTION_TYPE_CHOICES = [
        ('deposit', 'واریز'),
        ('withdraw', 'برداشت'),
        ('buy', 'خرید'),
        ('sell', 'فروش'),
        ('fee', 'کارمزد'),
        ('installment', 'قسط'),
        ('refund', 'بازگشت وجه'),
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
        related_name='all_transactions',
        verbose_name='کاربر'
    )
    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_TYPE_CHOICES,
        verbose_name='نوع تراکنش'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='وضعیت'
    )
    amount_irr = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0,
        verbose_name='مبلغ تومان'
    )
    amount_gold = models.DecimalField(
        max_digits=12,
        decimal_places=4,
        default=0,
        verbose_name='مقدار طلا (گرم)'
    )
    description = models.TextField(verbose_name='توضیحات')
    reference_id = models.CharField(
        max_length=100,
        unique=True,
        verbose_name='شناسه مرجع'
    )

    class Meta:
        verbose_name = 'تراکنش'
        verbose_name_plural = 'تراکنش‌ها'
        db_table = 'transactions'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at'], name='trans_user_created_idx'),
            models.Index(fields=['reference_id'], name='trans_ref_id_idx'),
            models.Index(fields=['transaction_type', 'status'], name='trans_type_status_idx'),
            models.Index(fields=['status', '-created_at'], name='trans_status_created_idx'),
        ]

    def __str__(self):
        return f"{self.get_transaction_type_display()} - {self.user.phone_number} - {self.reference_id}"
