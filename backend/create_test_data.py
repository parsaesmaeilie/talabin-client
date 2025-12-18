"""
Create test data for the Talabin backend.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.accounts.models import User
from apps.wallet.models import Wallet
from apps.prices.models import GoldPrice, PriceHistory
from apps.installments.models import InstallmentPlan
from django.utils import timezone

print("Creating test data...")

# Create superuser
if not User.objects.filter(phone_number='+989123456789').exists():
    admin = User.objects.create_superuser(
        phone_number='+989123456789',
        password='admin123',
        first_name='Admin',
        last_name='User',
        is_verified=True
    )
    print(f"[OK] Created superuser: {admin.phone_number} (password: admin123)")
else:
    admin = User.objects.get(phone_number='+989123456789')
    print(f"[OK] Superuser already exists: {admin.phone_number}")

# Create test user
if not User.objects.filter(phone_number='+989121234567').exists():
    user = User.objects.create_user(
        phone_number='+989121234567',
        password='test123',
        first_name='علی',
        last_name='احمدی',
        is_verified=True
    )
    print(f"[OK] Created test user: {user.phone_number} (password: test123)")
else:
    user = User.objects.get(phone_number='+989121234567')
    print(f"[OK] Test user already exists: {user.phone_number}")

# Add balance to test user wallet
wallet, created = Wallet.objects.get_or_create(user=user)
if created or wallet.balance_irr == 0:
    wallet.balance_irr = 5000000  # 5 million Toman
    wallet.gold_balance = 1.5  # 1.5 grams of gold
    wallet.save()
    print(f"[OK] Added balance to wallet: {wallet.balance_irr:,.0f} Toman, {wallet.gold_balance} grams")
else:
    print(f"[OK] Wallet exists with balance: {wallet.balance_irr:,.0f} Toman, {wallet.gold_balance} grams")

# Create gold prices
if not GoldPrice.objects.filter(is_active=True).exists():
    price = GoldPrice.objects.create(
        buy_price=2950000,  # Buy from users at lower price
        sell_price=3050000,  # Sell to users at higher price
        is_active=True,
        source='Test Data'
    )
    print(f"[OK] Created gold price: Buy {price.buy_price:,.0f}, Sell {price.sell_price:,.0f}")
else:
    price = GoldPrice.objects.filter(is_active=True).latest('created_at')
    print(f"[OK] Gold price exists: Buy {price.buy_price:,.0f}, Sell {price.sell_price:,.0f}")

# Create price history for charts
if PriceHistory.objects.count() == 0:
    base_price = 3000000
    import random
    from datetime import timedelta

    for i in range(24):  # 24 hours of data
        timestamp = timezone.now() - timedelta(hours=23-i)
        variation = random.randint(-50000, 50000)
        PriceHistory.objects.create(
            price=base_price + variation,
            source='Test Data'
        )
    print(f"[OK] Created {24} price history records")
else:
    print(f"[OK] Price history exists: {PriceHistory.objects.count()} records")

# Create installment plans
if not InstallmentPlan.objects.exists():
    plans = [
        {
            'name': 'طرح ۳ ماهه',
            'description': 'پرداخت در ۳ قسط ماهانه',
            'duration_months': 3,
            'interest_rate': 5,
            'min_amount': 500000,
            'max_amount': 5000000
        },
        {
            'name': 'طرح ۶ ماهه',
            'description': 'پرداخت در ۶ قسط ماهانه',
            'duration_months': 6,
            'interest_rate': 8,
            'min_amount': 1000000,
            'max_amount': 10000000
        },
        {
            'name': 'طرح ۱۲ ماهه',
            'description': 'پرداخت در ۱۲ قسط ماهانه',
            'duration_months': 12,
            'interest_rate': 12,
            'min_amount': 2000000,
            'max_amount': 20000000
        }
    ]

    for plan_data in plans:
        InstallmentPlan.objects.create(**plan_data)

    print(f"[OK] Created {len(plans)} installment plans")
else:
    print(f"[OK] Installment plans exist: {InstallmentPlan.objects.count()} plans")

print("\n" + "="*60)
print("Test data creation complete!")
print("="*60)
print("\nLogin Credentials:")
print("-" * 60)
print("Superuser (Admin):")
print("  Phone: +989123456789")
print("  Password: admin123")
print("\nTest User:")
print("  Phone: +989121234567")
print("  Password: test123")
print("  Balance: 5,000,000 Toman + 1.5 grams gold")
print("\n" + "="*60)
print("\nYou can now:")
print("1. Access admin panel: http://localhost:8000/admin")
print("2. Test API endpoints: http://localhost:8000/api/")
print("3. View API docs: http://localhost:8000/api/docs/")
print("="*60)
