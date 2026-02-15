"""
Reset passwords for test users.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.accounts.models import User

# Reset superuser password
try:
    admin = User.objects.get(phone_number='+989123456789')
    admin.set_password('admin123')
    admin.save()
    print(f"[OK] Reset password for: {admin.phone_number}")
    print(f"     Password: admin123")
except User.DoesNotExist:
    print("[ERROR] Superuser not found")

# Reset test user password
try:
    user = User.objects.get(phone_number='+989121234567')
    user.set_password('test123')
    user.save()
    print(f"[OK] Reset password for: {user.phone_number}")
    print(f"     Password: test123")
except User.DoesNotExist:
    print("[ERROR] Test user not found")

print("\n" + "="*60)
print("Passwords reset successfully!")
print("="*60)
print("\nYou can now login with:")
print("Phone: +989123456789  |  Password: admin123")
print("Phone: +989121234567  |  Password: test123")
print("="*60)
