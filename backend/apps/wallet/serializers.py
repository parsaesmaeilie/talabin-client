"""
Serializers for wallet app.
"""
from rest_framework import serializers
from .models import Wallet, WalletTransaction, BankAccount, DepositRequest, WithdrawalRequest
from decimal import Decimal


class WalletSerializer(serializers.ModelSerializer):
    """Serializer for Wallet model."""

    available_balance_irr = serializers.DecimalField(
        max_digits=15,
        decimal_places=2,
        read_only=True
    )
    available_gold_balance = serializers.DecimalField(
        max_digits=12,
        decimal_places=4,
        read_only=True
    )
    total_value_irr = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = [
            'id', 'balance_irr', 'gold_balance', 'frozen_balance_irr',
            'frozen_gold_balance', 'available_balance_irr', 'available_gold_balance',
            'total_value_irr', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'balance_irr', 'gold_balance', 'frozen_balance_irr',
            'frozen_gold_balance', 'created_at', 'updated_at'
        ]

    def get_total_value_irr(self, obj):
        """Calculate total wallet value in IRR."""
        # TODO: Get current gold price and calculate
        # For now, just return IRR balance
        return obj.balance_irr


class WalletTransactionSerializer(serializers.ModelSerializer):
    """Serializer for WalletTransaction model."""

    transaction_type_display = serializers.CharField(
        source='get_transaction_type_display',
        read_only=True
    )
    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )

    class Meta:
        model = WalletTransaction
        fields = [
            'id', 'transaction_type', 'transaction_type_display', 'status',
            'status_display', 'amount_irr', 'amount_gold', 'description',
            'reference_id', 'created_at'
        ]
        read_only_fields = fields


class BankAccountSerializer(serializers.ModelSerializer):
    """Serializer for BankAccount model."""

    class Meta:
        model = BankAccount
        fields = [
            'id', 'bank_name', 'account_number', 'sheba_number',
            'card_number', 'account_holder_name', 'is_verified',
            'is_default', 'created_at'
        ]
        read_only_fields = ['id', 'is_verified', 'created_at']

    def validate_sheba_number(self, value):
        """Validate SHEBA number format."""
        # Remove 'IR' prefix if present
        value = value.replace('IR', '').replace('ir', '')

        # Check if it's 24 digits
        if not value.isdigit() or len(value) != 24:
            raise serializers.ValidationError('شماره شبا باید 24 رقم باشد')

        return f'IR{value}'

    def validate_card_number(self, value):
        """Validate card number."""
        # Remove spaces and dashes
        value = value.replace(' ', '').replace('-', '')

        if not value.isdigit() or len(value) != 16:
            raise serializers.ValidationError('شماره کارت باید 16 رقم باشد')

        return value


class DepositRequestSerializer(serializers.ModelSerializer):
    """Serializer for DepositRequest model."""

    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = DepositRequest
        fields = [
            'id', 'amount', 'status', 'status_display', 'payment_method',
            'transaction_id', 'gateway_reference', 'receipt_image',
            'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'status', 'transaction_id', 'gateway_reference',
            'created_at', 'updated_at'
        ]

    def validate_amount(self, value):
        """Validate deposit amount."""
        if value < Decimal('10000'):
            raise serializers.ValidationError('حداقل مبلغ واریز 10,000 تومان است')
        return value


class CreateDepositSerializer(serializers.Serializer):
    """Serializer for creating a deposit request."""

    amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    payment_method = serializers.ChoiceField(choices=[
        ('online', 'درگاه آنلاین'),
        ('bank_transfer', 'کارت به کارت'),
    ])

    def validate_amount(self, value):
        """Validate deposit amount."""
        if value < Decimal('10000'):
            raise serializers.ValidationError('حداقل مبلغ واریز 10,000 تومان است')
        return value


class WithdrawalRequestSerializer(serializers.ModelSerializer):
    """Serializer for WithdrawalRequest model."""

    status_display = serializers.CharField(source='get_status_display', read_only=True)
    bank_account_details = BankAccountSerializer(source='bank_account', read_only=True)

    class Meta:
        model = WithdrawalRequest
        fields = [
            'id', 'bank_account', 'bank_account_details', 'amount', 'fee',
            'status', 'status_display', 'transaction_id', 'tracking_code',
            'rejection_reason', 'created_at', 'updated_at', 'processed_at'
        ]
        read_only_fields = [
            'id', 'fee', 'status', 'transaction_id', 'tracking_code',
            'rejection_reason', 'created_at', 'updated_at', 'processed_at'
        ]

    def validate_amount(self, value):
        """Validate withdrawal amount."""
        from django.conf import settings

        min_amount = getattr(settings, 'MIN_WITHDRAWAL_AMOUNT', 50000)
        if value < min_amount:
            raise serializers.ValidationError(f'حداقل مبلغ برداشت {min_amount:,} تومان است')

        return value


class CreateWithdrawalSerializer(serializers.Serializer):
    """Serializer for creating a withdrawal request."""

    bank_account_id = serializers.IntegerField()
    amount = serializers.DecimalField(max_digits=15, decimal_places=2)

    def validate_amount(self, value):
        """Validate withdrawal amount."""
        from django.conf import settings

        min_amount = getattr(settings, 'MIN_WITHDRAWAL_AMOUNT', 50000)
        if value < min_amount:
            raise serializers.ValidationError(f'حداقل مبلغ برداشت {min_amount:,} تومان است')

        return value
