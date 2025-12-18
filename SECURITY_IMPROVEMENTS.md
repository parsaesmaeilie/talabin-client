# Critical Security Improvements

This document contains code changes that MUST be implemented before production deployment.

## 1. Remove OTP Codes from API Responses

### File: `backend/apps/accounts/views.py`

**Lines 56-63 (register endpoint):**

**BEFORE:**
```python
return Response({
    'success': True,
    'message': 'ثبت‌نام با موفقیت انجام شد. کد تایید به شماره شما ارسال شد.',
    'data': {
        'phone_number': str(user.phone_number),
        'otp_code': otp_code  # Remove in production
    }
}, status=status.HTTP_201_CREATED)
```

**AFTER:**
```python
return Response({
    'success': True,
    'message': 'ثبت‌نام با موفقیت انجام شد. کد تایید به شماره شما ارسال شد.',
    'data': {
        'phone_number': str(user.phone_number),
        # OTP code sent via SMS - never include in response
    }
}, status=status.HTTP_201_CREATED)
```

**Find and update ALL similar occurrences** in:
- `send_otp` endpoint
- Any other endpoint that creates OTP codes

---

## 2. Implement Rate Limiting

### File: `backend/apps/accounts/views.py`

Add these imports at the top:
```python
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
```

Update the AuthViewSet class:

```python
class AuthViewSet(viewsets.GenericViewSet):
    """ViewSet for authentication operations."""

    permission_classes = [AllowAny]

    @method_decorator(ratelimit(key='ip', rate='5/h', method='POST'))
    @action(detail=False, methods=['post'])
    def register(self, request):
        """Register a new user. Limited to 5 attempts per hour per IP."""
        # ... existing code

    @method_decorator(ratelimit(key='ip', rate='10/h', method='POST'))
    @action(detail=False, methods=['post'])
    def login(self, request):
        """Login user. Limited to 10 attempts per hour per IP."""
        # ... existing code

    @method_decorator(ratelimit(key='ip', rate='3/5m', method='POST'))
    @action(detail=False, methods=['post'])
    def send_otp(self, request):
        """Send OTP. Limited to 3 attempts per 5 minutes per IP."""
        # ... existing code

    @method_decorator(ratelimit(key='user_or_ip', rate='5/10m', method='POST'))
    @action(detail=False, methods=['post'])
    def verify_otp(self, request):
        """Verify OTP. Limited to 5 attempts per 10 minutes."""
        # ... existing code
```

### File: `backend/apps/wallet/views.py`

```python
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

class WalletViewSet(viewsets.ModelViewSet):

    @method_decorator(ratelimit(key='user', rate='10/h', method='POST'))
    @action(detail=False, methods=['post'])
    def withdraw(self, request):
        """Create withdrawal request. Limited to 10 per hour."""
        # ... existing code

    @method_decorator(ratelimit(key='user', rate='20/h', method='POST'))
    @action(detail=False, methods=['post'])
    def deposit(self, request):
        """Create deposit request. Limited to 20 per hour."""
        # ... existing code
```

### File: `backend/apps/trading/views.py`

```python
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

class OrderViewSet(viewsets.ModelViewSet):

    @method_decorator(ratelimit(key='user', rate='100/h', method='POST'))
    @action(detail=False, methods=['post'])
    def place_order(self, request):
        """Place trading order. Limited to 100 per hour."""
        # ... existing code
```

---

## 3. Add Rate Limit Exception Handler

### File: `backend/apps/core/exceptions.py`

Add this to handle rate limit errors properly:

```python
from django_ratelimit.exceptions import Ratelimited
from rest_framework.views import exception_handler as drf_exception_handler

def custom_exception_handler(exc, context):
    """Custom exception handler that includes rate limit handling."""

    # Handle rate limit exceptions
    if isinstance(exc, Ratelimited):
        return Response({
            'success': False,
            'error': {
                'message': 'تعداد درخواست‌های شما از حد مجاز گذشته است. لطفاً بعداً تلاش کنید.',
                'code': 'rate_limit_exceeded'
            }
        }, status=status.HTTP_429_TOO_MANY_REQUESTS)

    # Default exception handling
    response = drf_exception_handler(exc, context)

    # ... rest of existing exception handler code
```

---

## 4. Production Settings Security

### File: `backend/config/settings.py`

Add these additional security settings for production:

```python
# After the existing production security settings (line 218+)

if not DEBUG:
    # Existing settings
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'

    # Add these additional settings
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

    # Referrer Policy
    SECURE_REFERRER_POLICY = 'same-origin'

    # Content Security Policy
    CSP_DEFAULT_SRC = ("'self'",)
    CSP_SCRIPT_SRC = ("'self'",)
    CSP_STYLE_SRC = ("'self'", "'unsafe-inline'")
    CSP_IMG_SRC = ("'self'", "data:", "https:")
    CSP_FONT_SRC = ("'self'",)
    CSP_CONNECT_SRC = ("'self'", config('CORS_ALLOWED_ORIGINS', default=''))
```

### Install required packages:
```bash
pip install django-csp whitenoise
```

Update requirements.txt:
```
django-csp==3.8
whitenoise==6.6.0
```

---

## 5. SMS Integration (Choose One)

### Option 1: Kavenegar

Create file: `backend/apps/core/sms.py`

```python
"""SMS service for sending OTP and notifications."""
import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class SMSService:
    """SMS service using Kavenegar."""

    def __init__(self):
        self.api_key = settings.KAVENEGAR_API_KEY
        self.sender = settings.SMS_SENDER
        self.base_url = "https://api.kavenegar.com/v1"

    def send_otp(self, phone_number: str, otp_code: str) -> bool:
        """Send OTP code via SMS."""
        if settings.DEBUG:
            logger.info(f"[DEBUG MODE] SMS to {phone_number}: کد تایید شما: {otp_code}")
            return True

        try:
            url = f"{self.base_url}/{self.api_key}/sms/send.json"
            message = f"کد تایید تالابین: {otp_code}\nاین کد تا 5 دقیقه اعتبار دارد."

            response = requests.post(url, data={
                'receptor': phone_number,
                'sender': self.sender,
                'message': message,
            }, timeout=10)

            if response.status_code == 200:
                result = response.json()
                return result.get('return', {}).get('status') == 200

            logger.error(f"SMS sending failed: {response.status_code} - {response.text}")
            return False

        except Exception as e:
            logger.error(f"SMS sending error: {str(e)}")
            return False

    def send_notification(self, phone_number: str, message: str) -> bool:
        """Send general notification SMS."""
        if settings.DEBUG:
            logger.info(f"[DEBUG MODE] SMS to {phone_number}: {message}")
            return True

        try:
            url = f"{self.base_url}/{self.api_key}/sms/send.json"

            response = requests.post(url, data={
                'receptor': phone_number,
                'sender': self.sender,
                'message': message,
            }, timeout=10)

            return response.status_code == 200

        except Exception as e:
            logger.error(f"SMS sending error: {str(e)}")
            return False


# Singleton instance
sms_service = SMSService()
```

### Update `backend/apps/accounts/views.py`:

```python
from apps.core.sms import sms_service

class AuthViewSet(viewsets.GenericViewSet):

    @action(detail=False, methods=['post'])
    def register(self, request):
        # ... existing code ...

        # Send OTP via SMS
        sms_sent = sms_service.send_otp(
            phone_number=str(user.phone_number),
            otp_code=otp_code
        )

        if not sms_sent and not settings.DEBUG:
            return Response({
                'success': False,
                'error': {'message': 'خطا در ارسال پیامک. لطفاً دوباره تلاش کنید.'}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            'success': True,
            'message': 'ثبت‌نام با موفقیت انجام شد. کد تایید به شماره شما ارسال شد.',
            'data': {
                'phone_number': str(user.phone_number),
            }
        }, status=status.HTTP_201_CREATED)
```

### Add to `backend/config/settings.py`:

```python
# SMS Configuration
KAVENEGAR_API_KEY = config('KAVENEGAR_API_KEY', default='')
SMS_SENDER = config('SMS_SENDER', default='10008663')
```

---

## 6. Database Query Optimization

### Add indexes to models for better performance:

**File: `backend/apps/trading/models.py`**

```python
class Order(models.Model):
    # ... existing fields ...

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['order_type', 'status']),
        ]
```

**File: `backend/apps/transactions/models.py`**

```python
class Transaction(models.Model):
    # ... existing fields ...

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['transaction_type', 'status']),
            models.Index(fields=['status', 'created_at']),
        ]
```

**After adding indexes, create and run migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 7. Add Input Validation

### File: `backend/apps/trading/serializers.py`

Add stricter validation:

```python
from decimal import Decimal
from rest_framework import serializers

class PlaceOrderSerializer(serializers.Serializer):
    order_type = serializers.ChoiceField(choices=['buy', 'sell'])
    amount_irr = serializers.DecimalField(
        max_digits=15,
        decimal_places=0,
        min_value=Decimal('100000'),  # 100K min
        max_value=Decimal('1000000000'),  # 1B max
        error_messages={
            'min_value': 'حداقل مبلغ خرید ۱۰۰,۰۰۰ تومان است.',
            'max_value': 'حداکثر مبلغ خرید ۱,۰۰۰,۰۰۰,۰۰۰ تومان است.',
        }
    )

    def validate_amount_irr(self, value):
        """Additional validation for amount."""
        if value <= 0:
            raise serializers.ValidationError('مبلغ باید بیشتر از صفر باشد.')

        # Check if amount is reasonable (not too many decimal places)
        if value % 1000 != 0:
            raise serializers.ValidationError('مبلغ باید مضربی از ۱۰۰۰ تومان باشد.')

        return value
```

---

## 8. File Upload Security

### File: `backend/apps/accounts/models.py`

Add file validation:

```python
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError

def validate_file_size(file):
    """Validate uploaded file size (max 5MB)."""
    max_size_mb = 5
    if file.size > max_size_mb * 1024 * 1024:
        raise ValidationError(f'حجم فایل نباید بیشتر از {max_size_mb} مگابایت باشد.')

class IdentityDocument(models.Model):
    document = models.FileField(
        upload_to='identity_documents/%Y/%m/',
        validators=[
            FileExtensionValidator(
                allowed_extensions=['jpg', 'jpeg', 'png', 'pdf'],
                message='فقط فایل‌های JPG، PNG و PDF مجاز هستند.'
            ),
            validate_file_size,
        ]
    )
```

---

## 9. Add Logging

### File: `backend/config/settings.py`

Add comprehensive logging configuration:

```python
# Create logs directory in BASE_DIR
LOGS_DIR = BASE_DIR / 'logs'
LOGS_DIR.mkdir(exist_ok=True)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {asctime} {message}',
            'style': '{',
        },
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'file_error': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': LOGS_DIR / 'error.log',
            'maxBytes': 1024 * 1024 * 15,  # 15MB
            'backupCount': 10,
            'formatter': 'verbose',
        },
        'file_security': {
            'level': 'WARNING',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': LOGS_DIR / 'security.log',
            'maxBytes': 1024 * 1024 * 15,
            'backupCount': 10,
            'formatter': 'verbose',
        },
        'file_info': {
            'level': 'INFO',
            'filters': ['require_debug_false'],
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': LOGS_DIR / 'info.log',
            'maxBytes': 1024 * 1024 * 15,
            'backupCount': 10,
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file_error', 'file_info'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.security': {
            'handlers': ['file_security'],
            'level': 'WARNING',
            'propagate': False,
        },
        'apps': {
            'handlers': ['console', 'file_error', 'file_info'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}
```

---

## 10. Run Django Security Check

Before deploying, run Django's built-in security check:

```bash
cd backend
python manage.py check --deploy
```

Fix any warnings or errors reported.

---

## Implementation Priority

1. **IMMEDIATE (Before any production deployment):**
   - Remove OTP codes from responses
   - Implement rate limiting
   - Add SMS integration
   - Set DEBUG=False
   - Change SECRET_KEY
   - Set up HTTPS

2. **HIGH (Within first week):**
   - Add logging
   - Database optimization
   - Input validation
   - File upload security

3. **MEDIUM (Within first month):**
   - CSP headers
   - Additional monitoring
   - Performance optimization

---

## Testing After Implementation

```bash
# 1. Test rate limiting
# Try to login 11 times rapidly - should get rate limited

# 2. Test OTP not in response
# Register a new user - verify OTP code is NOT in the response

# 3. Run security check
python manage.py check --deploy

# 4. Run tests
python manage.py test

# 5. Check logs are being created
ls -la logs/
```

---

**Remember:** Test all changes in a staging environment before deploying to production!
