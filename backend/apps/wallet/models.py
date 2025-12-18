"""
Wallet models for managing user balances.
"""
from django.db import models
from django.conf import settings
from apps.core.models import TimeStampedModel
from apps.core.validators import validate_receipt_file
from decimal import Decimal


class Wallet(TimeStampedModel):
    """User wallet model."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='wallet',
        verbose_name='کاربر'
    )
    balance_irr = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0,
        verbose_name='موجودی تومان'
    )
    gold_balance = models.DecimalField(
        max_digits=12,
        decimal_places=4,
        default=0,
        verbose_name='موجودی طلا (گرم)'
    )
    frozen_balance_irr = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0,
        verbose_name='موجودی مسدود شده تومان'
    )
    frozen_gold_balance = models.DecimalField(
        max_digits=12,
        decimal_places=4,
        default=0,
        verbose_name='موجودی مسدود شده طلا (گرم)'
    )

    class Meta:
        verbose_name = 'کیف پول'
        verbose_name_plural = 'کیف پول‌ها'
        db_table = 'wallets'

    def __str__(self):
        return f"Wallet - {self.user.phone_number}"

    @property
    def available_balance_irr(self):
        """Get available IRR balance."""
        return self.balance_irr - self.frozen_balance_irr

    @property
    def available_gold_balance(self):
        """Get available gold balance."""
        return self.gold_balance - self.frozen_gold_balance

    def freeze_balance(self, amount_irr=0, amount_gold=0):
        """Freeze specified amounts."""
        if amount_irr > self.available_balance_irr:
            raise ValueError('موجودی تومان ناکافی است')
        if amount_gold > self.available_gold_balance:
            raise ValueError('موجودی طلا ناکافی است')

        self.frozen_balance_irr += Decimal(str(amount_irr))
        self.frozen_gold_balance += Decimal(str(amount_gold))
        self.save()

    def unfreeze_balance(self, amount_irr=0, amount_gold=0):
        """Unfreeze specified amounts."""
        self.frozen_balance_irr = max(0, self.frozen_balance_irr - Decimal(str(amount_irr)))
        self.frozen_gold_balance = max(0, self.frozen_gold_balance - Decimal(str(amount_gold)))
        self.save()

    def add_balance(self, amount_irr=0, amount_gold=0):
        """Add to balance."""
        self.balance_irr += Decimal(str(amount_irr))
        self.gold_balance += Decimal(str(amount_gold))
        self.save()

    def deduct_balance(self, amount_irr=0, amount_gold=0):
        """Deduct from balance."""
        if amount_irr > self.balance_irr:
            raise ValueError('موجودی تومان ناکافی است')
        if amount_gold > self.gold_balance:
            raise ValueError('موجودی طلا ناکافی است')

        self.balance_irr -= Decimal(str(amount_irr))
        self.gold_balance -= Decimal(str(amount_gold))
        self.save()


class WalletTransaction(TimeStampedModel):
    """Wallet transaction history."""

    TRANSACTION_TYPE_CHOICES = [
        ('deposit', 'واریز'),
        ('withdraw', 'برداشت'),
        ('buy_gold', 'خرید طلا'),
        ('sell_gold', 'فروش طلا'),
        ('fee', 'کارمزد'),
        ('refund', 'بازگشت وجه'),
    ]

    STATUS_CHOICES = [
        ('pending', 'در انتظار'),
        ('processing', 'در حال پردازش'),
        ('completed', 'تکمیل شده'),
        ('failed', 'ناموفق'),
        ('cancelled', 'لغو شده'),
    ]

    wallet = models.ForeignKey(
        Wallet,
        on_delete=models.CASCADE,
        related_name='transactions',
        verbose_name='کیف پول'
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
    description = models.TextField(blank=True, verbose_name='توضیحات')
    reference_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name='شناسه مرجع'
    )

    class Meta:
        verbose_name = 'تراکنش کیف پول'
        verbose_name_plural = 'تراکنش‌های کیف پول'
        db_table = 'wallet_transactions'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_transaction_type_display()} - {self.wallet.user.phone_number}"


class BankAccount(TimeStampedModel):
    """User bank account for deposits and withdrawals."""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='bank_accounts',
        verbose_name='کاربر'
    )
    bank_name = models.CharField(max_length=100, verbose_name='نام بانک')
    account_number = models.CharField(max_length=50, verbose_name='شماره حساب')
    sheba_number = models.CharField(max_length=26, verbose_name='شماره شبا')
    card_number = models.CharField(max_length=16, verbose_name='شماره کارت')
    account_holder_name = models.CharField(max_length=200, verbose_name='نام صاحب حساب')
    is_verified = models.BooleanField(default=False, verbose_name='تایید شده')
    is_default = models.BooleanField(default=False, verbose_name='پیش‌فرض')

    class Meta:
        verbose_name = 'حساب بانکی'
        verbose_name_plural = 'حساب‌های بانکی'
        db_table = 'bank_accounts'

    def __str__(self):
        return f"{self.bank_name} - {self.account_number}"


class DepositRequest(TimeStampedModel):
    """Deposit request model."""

    STATUS_CHOICES = [
        ('pending', 'در انتظار پرداخت'),
        ('paid', 'پرداخت شده'),
        ('verified', 'تایید شده'),
        ('rejected', 'رد شده'),
        ('cancelled', 'لغو شده'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='deposits',
        verbose_name='کاربر'
    )
    amount = models.DecimalField(max_digits=15, decimal_places=2, verbose_name='مبلغ')
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='وضعیت'
    )
    payment_method = models.CharField(max_length=50, verbose_name='روش پرداخت')
    transaction_id = models.CharField(
        max_length=100,
        unique=True,
        verbose_name='شناسه تراکنش'
    )
    gateway_reference = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name='شناسه درگاه'
    )
    receipt_image = models.ImageField(
        upload_to='deposits/',
        blank=True,
        null=True,
        verbose_name='تصویر رسید',
        validators=[validate_receipt_file]
    )
    notes = models.TextField(blank=True, verbose_name='یادداشت')

    class Meta:
        verbose_name = 'درخواست واریز'
        verbose_name_plural = 'درخواست‌های واریز'
        db_table = 'deposit_requests'
        ordering = ['-created_at']

    def __str__(self):
        return f"Deposit - {self.user.phone_number} - {self.amount}"


class WithdrawalRequest(TimeStampedModel):
    """Withdrawal request model."""

    STATUS_CHOICES = [
        ('pending', 'در انتظار بررسی'),
        ('approved', 'تایید شده'),
        ('processing', 'در حال پردازش'),
        ('completed', 'تکمیل شده'),
        ('rejected', 'رد شده'),
        ('cancelled', 'لغو شده'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='withdrawals',
        verbose_name='کاربر'
    )
    bank_account = models.ForeignKey(
        BankAccount,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='حساب بانکی'
    )
    amount = models.DecimalField(max_digits=15, decimal_places=2, verbose_name='مبلغ')
    fee = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0,
        verbose_name='کارمزد'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='وضعیت'
    )
    transaction_id = models.CharField(
        max_length=100,
        unique=True,
        verbose_name='شناسه تراکنش'
    )
    tracking_code = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name='کد پیگیری'
    )
    rejection_reason = models.TextField(blank=True, verbose_name='دلیل رد')
    processed_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ پردازش')

    class Meta:
        verbose_name = 'درخواست برداشت'
        verbose_name_plural = 'درخواست‌های برداشت'
        db_table = 'withdrawal_requests'
        ordering = ['-created_at']

    def __str__(self):
        return f"Withdrawal - {self.user.phone_number} - {self.amount}"
