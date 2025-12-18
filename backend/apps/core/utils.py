"""
Utility functions used across the application.
"""
import random
import string
from datetime import datetime, timedelta
from django.utils import timezone


def generate_otp(length=6):
    """Generate a random OTP code."""
    return ''.join(random.choices(string.digits, k=length))


def generate_transaction_id():
    """Generate a unique transaction ID."""
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    random_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"TXN{timestamp}{random_part}"


def is_otp_expired(created_at, expiry_minutes=5):
    """Check if OTP has expired."""
    if timezone.is_naive(created_at):
        created_at = timezone.make_aware(created_at)
    expiry_time = created_at + timedelta(minutes=expiry_minutes)
    return timezone.now() > expiry_time


def calculate_fee(amount, fee_percentage=0.5):
    """Calculate transaction fee."""
    return (amount * fee_percentage) / 100


def format_phone_number(phone):
    """Format phone number to standard format."""
    # Remove any non-digit characters
    phone = ''.join(filter(str.isdigit, phone))

    # Ensure it starts with country code
    if phone.startswith('0'):
        phone = '98' + phone[1:]
    elif not phone.startswith('98'):
        phone = '98' + phone

    return f'+{phone}'
