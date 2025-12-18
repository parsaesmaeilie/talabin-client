"""
Installment models for payment plans.
"""
from django.db import models
from django.conf import settings
from apps.core.models import TimeStampedModel
from decimal import Decimal


class InstallmentPlan(TimeStampedModel):
    """Installment plan template."""

    name = models.CharField(max_length=200, verbose_name='نام طرح')
    description = models.TextField(verbose_name='توضیحات')
    duration_months = models.IntegerField(verbose_name='مدت (ماه)')
    interest_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
        verbose_name='نرخ سود (%)'
    )
    min_amount = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='حداقل مبلغ'
    )
    max_amount = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='حداکثر مبلغ'
    )
    is_active = models.BooleanField(default=True, verbose_name='فعال')

    class Meta:
        verbose_name = 'طرح اقساط'
        verbose_name_plural = 'طرح‌های اقساط'
        db_table = 'installment_plans'

    def __str__(self):
        return f"{self.name} - {self.duration_months} ماهه"


class Installment(TimeStampedModel):
    """User installment subscription."""

    STATUS_CHOICES = [
        ('active', 'فعال'),
        ('completed', 'تکمیل شده'),
        ('defaulted', 'معوق'),
        ('cancelled', 'لغو شده'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='installments',
        verbose_name='کاربر'
    )
    plan = models.ForeignKey(
        InstallmentPlan,
        on_delete=models.PROTECT,
        verbose_name='طرح'
    )
    total_amount = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='مبلغ کل'
    )
    monthly_payment = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='قسط ماهانه'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active',
        verbose_name='وضعیت'
    )
    start_date = models.DateField(verbose_name='تاریخ شروع')
    end_date = models.DateField(verbose_name='تاریخ پایان')

    class Meta:
        verbose_name = 'قسط'
        verbose_name_plural = 'اقساط'
        db_table = 'installments'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.phone_number} - {self.plan.name}"


class InstallmentPayment(TimeStampedModel):
    """Individual installment payment."""

    STATUS_CHOICES = [
        ('pending', 'در انتظار'),
        ('paid', 'پرداخت شده'),
        ('overdue', 'معوق'),
    ]

    installment = models.ForeignKey(
        Installment,
        on_delete=models.CASCADE,
        related_name='payments',
        verbose_name='قسط'
    )
    payment_number = models.IntegerField(verbose_name='شماره قسط')
    amount = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='مبلغ'
    )
    due_date = models.DateField(verbose_name='سررسید')
    paid_date = models.DateField(null=True, blank=True, verbose_name='تاریخ پرداخت')
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='وضعیت'
    )
    transaction_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name='شناسه تراکنش'
    )

    class Meta:
        verbose_name = 'پرداخت قسط'
        verbose_name_plural = 'پرداخت‌های قسط'
        db_table = 'installment_payments'
        ordering = ['due_date']
        unique_together = ['installment', 'payment_number']

    def __str__(self):
        return f"قسط {self.payment_number} - {self.installment.user.phone_number}"
