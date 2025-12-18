"""
Admin configuration for wallet app.
"""
from django.contrib import admin
from .models import Wallet, WalletTransaction, BankAccount, DepositRequest, WithdrawalRequest


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    """Admin interface for Wallet model."""

    list_display = ['user', 'balance_irr', 'gold_balance', 'frozen_balance_irr', 'frozen_gold_balance', 'created_at']
    search_fields = ['user__phone_number', 'user__first_name', 'user__last_name']
    readonly_fields = ['created_at', 'updated_at']
    list_filter = ['created_at']


@admin.register(WalletTransaction)
class WalletTransactionAdmin(admin.ModelAdmin):
    """Admin interface for WalletTransaction model."""

    list_display = ['wallet', 'transaction_type', 'status', 'amount_irr', 'amount_gold', 'created_at']
    list_filter = ['transaction_type', 'status', 'created_at']
    search_fields = ['wallet__user__phone_number', 'reference_id', 'description']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']


@admin.register(BankAccount)
class BankAccountAdmin(admin.ModelAdmin):
    """Admin interface for BankAccount model."""

    list_display = ['user', 'bank_name', 'account_number', 'is_verified', 'is_default', 'created_at']
    list_filter = ['bank_name', 'is_verified', 'is_default', 'created_at']
    search_fields = ['user__phone_number', 'account_number', 'sheba_number', 'card_number']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(DepositRequest)
class DepositRequestAdmin(admin.ModelAdmin):
    """Admin interface for DepositRequest model."""

    list_display = ['user', 'amount', 'status', 'payment_method', 'transaction_id', 'created_at']
    list_filter = ['status', 'payment_method', 'created_at']
    search_fields = ['user__phone_number', 'transaction_id', 'gateway_reference']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    actions = ['approve_deposits']

    def approve_deposits(self, request, queryset):
        """Approve selected deposits."""
        from django.db import transaction

        approved_count = 0
        for deposit in queryset.filter(status='paid'):
            with transaction.atomic():
                # Update deposit status
                deposit.status = 'verified'
                deposit.save()

                # Add to wallet
                wallet, _ = Wallet.objects.get_or_create(user=deposit.user)
                wallet.add_balance(amount_irr=deposit.amount)

                # Create transaction
                WalletTransaction.objects.create(
                    wallet=wallet,
                    transaction_type='deposit',
                    status='completed',
                    amount_irr=deposit.amount,
                    description=f'واریز تایید شده از طریق {deposit.payment_method}',
                    reference_id=deposit.transaction_id
                )

                approved_count += 1

        self.message_user(request, f'{approved_count} واریز تایید شد')

    approve_deposits.short_description = 'تایید واریزهای انتخاب شده'


@admin.register(WithdrawalRequest)
class WithdrawalRequestAdmin(admin.ModelAdmin):
    """Admin interface for WithdrawalRequest model."""

    list_display = ['user', 'amount', 'fee', 'status', 'transaction_id', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__phone_number', 'transaction_id', 'tracking_code']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    actions = ['approve_withdrawals', 'complete_withdrawals']

    def approve_withdrawals(self, request, queryset):
        """Approve selected withdrawals."""
        updated = queryset.filter(status='pending').update(status='approved')
        self.message_user(request, f'{updated} برداشت تایید شد')

    approve_withdrawals.short_description = 'تایید برداشت‌های انتخاب شده'

    def complete_withdrawals(self, request, queryset):
        """Complete selected withdrawals."""
        from django.db import transaction
        from django.utils import timezone

        completed_count = 0
        for withdrawal in queryset.filter(status='approved'):
            with transaction.atomic():
                # Update withdrawal status
                withdrawal.status = 'completed'
                withdrawal.processed_at = timezone.now()
                withdrawal.save()

                # Deduct from wallet
                wallet = Wallet.objects.get(user=withdrawal.user)
                total_amount = withdrawal.amount + withdrawal.fee
                wallet.unfreeze_balance(amount_irr=total_amount)
                wallet.deduct_balance(amount_irr=total_amount)

                # Update transaction
                WalletTransaction.objects.filter(
                    reference_id=withdrawal.transaction_id
                ).update(status='completed')

                completed_count += 1

        self.message_user(request, f'{completed_count} برداشت تکمیل شد')

    complete_withdrawals.short_description = 'تکمیل برداشت‌های انتخاب شده'
