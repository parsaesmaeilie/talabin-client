# Production Readiness Checklist

This document outlines critical security improvements and production configurations needed before deploying Talabin to production.

## Critical Security Issues

### 1. OTP Code Exposure (HIGH PRIORITY)
**Location:** `backend/apps/accounts/views.py:61`

**Issue:** OTP codes are being returned in API responses.

**Current Code:**
```python
'data': {
    'phone_number': str(user.phone_number),
    'otp_code': otp_code  # Remove in production
}
```

**Fix Required:**
Remove the `otp_code` from the response in production. OTPs should only be sent via SMS/Email, never returned in API responses.

```python
'data': {
    'phone_number': str(user.phone_number),
    # DO NOT include otp_code in production
}
```

**Action:** Update the register and send-otp endpoints to not include OTP codes in responses when `DEBUG=False`.

---

### 2. Rate Limiting Not Implemented (HIGH PRIORITY)

**Issue:** `django-ratelimit` is installed but not being used on sensitive endpoints.

**Affected Endpoints:**
- `/api/auth/login/` - Brute force attacks possible
- `/api/auth/register/` - Spam registration
- `/api/auth/send-otp/` - OTP flooding
- `/api/auth/verify-otp/` - OTP brute force
- `/api/wallet/withdraw/` - Financial abuse
- `/api/trading/orders/` - Order spam

**Fix Required:**
Add rate limiting decorators to sensitive views.

**Implementation:**
```python
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

class AuthViewSet(viewsets.GenericViewSet):

    @method_decorator(ratelimit(key='ip', rate='5/h', method='POST'))
    @action(detail=False, methods=['post'])
    def register(self, request):
        # ... existing code

    @method_decorator(ratelimit(key='ip', rate='10/h', method='POST'))
    @action(detail=False, methods=['post'])
    def login(self, request):
        # ... existing code

    @method_decorator(ratelimit(key='ip', rate='3/5m', method='POST'))
    @action(detail=False, methods=['post'])
    def send_otp(self, request):
        # ... existing code
```

**Recommended Rate Limits:**
- Login: 10 attempts per hour per IP
- Register: 5 registrations per hour per IP
- Send OTP: 3 attempts per 5 minutes per IP
- Verify OTP: 5 attempts per 10 minutes per IP/phone
- Withdraw: 10 requests per hour per user
- Trading: 100 orders per hour per user

---

### 3. Token Storage in localStorage (MEDIUM PRIORITY)

**Location:** `lib/api/client.ts:25` and `lib/api/auth.ts:52`

**Issue:** JWT tokens stored in localStorage are vulnerable to XSS attacks.

**Current Implementation:**
```typescript
localStorage.setItem('access_token', token);
```

**Recommendation:**
Consider using `httpOnly` cookies for token storage, or implement additional XSS protection:

1. **Option 1 (Recommended):** Use httpOnly cookies
   - Backend sets tokens as httpOnly cookies
   - Frontend doesn't need to manually handle tokens
   - Protected from XSS attacks

2. **Option 2:** Keep localStorage but add CSP headers
   - Add Content Security Policy headers
   - Implement strict input sanitization
   - Use DOMPurify for any user-generated content

**For Option 1 - Backend Changes:**
```python
# In Django settings.py
SIMPLE_JWT = {
    # ... existing settings
    'AUTH_COOKIE': 'access_token',
    'AUTH_COOKIE_SECURE': True,  # HTTPS only
    'AUTH_COOKIE_HTTP_ONLY': True,
    'AUTH_COOKIE_SAMESITE': 'Lax',
}
```

---

### 4. Missing Input Validation & Sanitization (MEDIUM PRIORITY)

**Areas to Review:**
- File upload validation (size, type, content)
- Amount validation (negative numbers, overflow)
- Phone number format validation
- National ID validation
- User input sanitization

**Recommendations:**

**File Uploads:**
```python
# backend/apps/accounts/models.py
from django.core.validators import FileExtensionValidator

class IdentityDocument(models.Model):
    document = models.ImageField(
        upload_to='identity_documents/',
        validators=[
            FileExtensionValidator(['jpg', 'jpeg', 'png', 'pdf']),
        ],
        max_length=5*1024*1024  # 5MB max
    )
```

**Amount Validation:**
```python
# In serializers
from decimal import Decimal

class OrderSerializer(serializers.Serializer):
    amount_irr = serializers.DecimalField(
        max_digits=15,
        decimal_places=0,
        min_value=Decimal('100000'),  # 100K minimum
        max_value=Decimal('1000000000')  # 1B maximum
    )
```

---

### 5. SMS/Email Service Integration (HIGH PRIORITY)

**Issue:** OTP system currently only logs to console.

**Required Actions:**
1. Integrate SMS provider (e.g., Kavenegar, Ghasedak, IPPanel)
2. Set up email service for notifications
3. Remove console logging of OTPs

**Example Integration (Kavenegar):**
```python
# backend/apps/core/sms.py
import requests
from django.conf import settings

def send_sms(phone_number, message):
    if settings.DEBUG:
        print(f"SMS to {phone_number}: {message}")
        return True

    # Production SMS sending
    api_key = settings.KAVENEGAR_API_KEY
    url = f"https://api.kavenegar.com/v1/{api_key}/sms/send.json"

    response = requests.post(url, data={
        'receptor': phone_number,
        'message': message,
    })

    return response.status_code == 200
```

**Settings Required:**
```env
# .env
SMS_PROVIDER=kavenegar
KAVENEGAR_API_KEY=your-api-key-here
SMS_SENDER=10008663
```

---

## Environment & Configuration

### 6. Environment Variables (HIGH PRIORITY)

**Create Production .env File:**

```env
# DO NOT commit this file to git!

# Security
SECRET_KEY=<generate-a-strong-random-secret-key>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database (PostgreSQL for production)
DB_ENGINE=django.db.backends.postgresql
DB_NAME=talabin_production
DB_USER=talabin_user
DB_PASSWORD=<strong-password>
DB_HOST=localhost
DB_PORT=5432

# JWT Settings
JWT_ACCESS_TOKEN_LIFETIME=15  # 15 minutes
JWT_REFRESH_TOKEN_LIFETIME=7  # 7 days

# CORS Settings
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Redis (for Celery and caching)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

# Email Settings
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=<app-password>

# SMS Settings
KAVENEGAR_API_KEY=<your-api-key>
SMS_SENDER=10008663

# Application Settings
TRANSACTION_FEE_PERCENTAGE=0.5
MIN_PURCHASE_AMOUNT=100000
MIN_WITHDRAWAL_AMOUNT=50000

# Payment Gateway
ZARINPAL_MERCHANT_ID=<your-merchant-id>
# or
IDPAY_API_KEY=<your-api-key>
```

**Generate SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

### 7. Frontend Environment Variables

**Create `.env.production`:**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

---

## Infrastructure & Deployment

### 8. Database Migration (CRITICAL)

**Action Required:**
- Migrate from SQLite to PostgreSQL
- Set up regular database backups
- Implement database replication for high availability

**PostgreSQL Setup:**
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE talabin_production;
CREATE USER talabin_user WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE talabin_production TO talabin_user;
ALTER USER talabin_user CREATEDB;  # For running tests
```

**Backup Strategy:**
```bash
# Daily automated backup
0 2 * * * pg_dump talabin_production > /backups/talabin_$(date +\%Y\%m\%d).sql
```

---

### 9. Static & Media Files (CRITICAL)

**Current Issue:** Static files served by Django (inefficient).

**Production Setup:**

**settings.py:**
```python
# Use WhiteNoise for static files
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    # ... rest of middleware
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

**Or use CDN/S3:**
```python
# AWS S3 for media files
AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = config('AWS_S3_REGION_NAME')

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```

---

### 10. HTTPS/SSL Configuration (CRITICAL)

**Required for Production:**

**Django Settings (already configured):**
```python
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
```

**Get SSL Certificate:**
- Use Let's Encrypt (free)
- Configure Nginx with SSL

**Nginx Configuration:**
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /path/to/talabin/backend/staticfiles/;
    }

    location /media/ {
        alias /path/to/talabin/backend/media/;
    }
}
```

---

### 11. Monitoring & Logging (HIGH PRIORITY)

**Add Production Logging:**

**settings.py:**
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR / 'logs/django.log',
            'maxBytes': 1024 * 1024 * 15,  # 15MB
            'backupCount': 10,
            'formatter': 'verbose',
        },
        'security_file': {
            'level': 'WARNING',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR / 'logs/security.log',
            'maxBytes': 1024 * 1024 * 15,  # 15MB
            'backupCount': 10,
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
        'django.security': {
            'handlers': ['security_file'],
            'level': 'WARNING',
            'propagate': False,
        },
    },
}
```

**Recommended Monitoring Tools:**
- Sentry for error tracking
- Prometheus + Grafana for metrics
- ELK Stack for log aggregation
- UptimeRobot for uptime monitoring

---

### 12. Celery for Background Tasks (MEDIUM PRIORITY)

**Required Services:**
- Redis (already configured)
- Celery workers
- Celery beat (for periodic tasks)

**Start Celery:**
```bash
# Worker
celery -A config worker -l info

# Beat (for scheduled tasks)
celery -A config beat -l info
```

**Use Cases:**
- Send OTP SMS asynchronously
- Process large transactions
- Generate reports
- Send email notifications
- Update gold prices from external API

---

## Additional Security Measures

### 13. Add Security Headers (MEDIUM PRIORITY)

**Install django-csp:**
```bash
pip install django-csp
```

**settings.py:**
```python
MIDDLEWARE = [
    # ... existing middleware
    'csp.middleware.CSPMiddleware',
]

# Content Security Policy
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'")
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'")
CSP_IMG_SRC = ("'self'", "data:", "https:")
CSP_FONT_SRC = ("'self'", "data:")
CSP_CONNECT_SRC = ("'self'", "https://api.yourdomain.com")
```

---

### 14. Payment Gateway Integration (CRITICAL)

**Current Status:** Placeholder implementation

**Action Required:**
Integrate Iranian payment gateway:
- ZarinPal
- IDPay
- NextPay
- Pay.ir

**Example (ZarinPal):**
```python
# backend/apps/wallet/payment_gateway.py
import requests
from django.conf import settings

class ZarinPalGateway:
    SANDBOX_URL = "https://sandbox.zarinpal.com/pg/v4/payment/"
    PRODUCTION_URL = "https://payment.zarinpal.com/pg/v4/payment/"

    def __init__(self):
        self.merchant_id = settings.ZARINPAL_MERCHANT_ID
        self.base_url = self.SANDBOX_URL if settings.DEBUG else self.PRODUCTION_URL

    def create_payment(self, amount, description, callback_url):
        url = f"{self.base_url}request.json"
        data = {
            "merchant_id": self.merchant_id,
            "amount": amount,
            "description": description,
            "callback_url": callback_url,
        }
        response = requests.post(url, json=data)
        return response.json()

    def verify_payment(self, authority, amount):
        url = f"{self.base_url}verify.json"
        data = {
            "merchant_id": self.merchant_id,
            "authority": authority,
            "amount": amount,
        }
        response = requests.post(url, json=data)
        return response.json()
```

---

### 15. API Documentation Access (LOW PRIORITY)

**Current:** API docs publicly accessible at `/api/docs/`

**Recommendation:**
Restrict in production or add authentication.

**settings.py:**
```python
SPECTACULAR_SETTINGS = {
    'TITLE': 'Talabin API',
    'DESCRIPTION': 'Digital Gold Trading Platform API',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SERVE_PERMISSIONS': ['rest_framework.permissions.IsAdminUser'],  # Add this
}
```

---

### 16. Implement CSRF Protection for Frontend (MEDIUM PRIORITY)

**Current:** Using JWT (CSRF not an issue for stateless API)

**However:** If using cookies for auth (recommended in #3), enable CSRF.

**Frontend:**
```typescript
// Get CSRF token from cookie
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Include in requests
headers['X-CSRFToken'] = getCookie('csrftoken');
```

---

## Testing & Quality Assurance

### 17. Test Coverage (MEDIUM PRIORITY)

**Add Comprehensive Tests:**
- Unit tests for models and utilities
- Integration tests for API endpoints
- End-to-end tests for critical flows

**Run Tests:**
```bash
cd backend
python manage.py test
```

**Coverage:**
```bash
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html
```

**Target:** Minimum 80% code coverage for production.

---

### 18. Load Testing (MEDIUM PRIORITY)

**Tools:**
- Locust
- Apache JMeter
- K6

**Test Scenarios:**
- 100 concurrent users placing orders
- 1000 requests per second to price API
- Sustained load over 1 hour

---

## Performance Optimization

### 19. Database Optimization (MEDIUM PRIORITY)

**Add Database Indexes:**
```python
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
    order_type = models.CharField(max_length=10, db_index=True)
    status = models.CharField(max_length=20, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['status', 'created_at']),
        ]
```

**Enable Query Optimization:**
```python
# Use select_related and prefetch_related
orders = Order.objects.select_related('user').prefetch_related('transactions')
```

---

### 20. Caching Strategy (MEDIUM PRIORITY)

**Add Redis Caching:**

**settings.py:**
```python
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': f'redis://{config("REDIS_HOST")}:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```

**Cache Gold Prices:**
```python
from django.core.cache import cache

def get_current_gold_price():
    price = cache.get('current_gold_price')
    if not price:
        price = GoldPrice.objects.latest('created_at')
        cache.set('current_gold_price', price, timeout=60)  # 1 minute
    return price
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] SECRET_KEY changed to strong random value
- [ ] DEBUG=False
- [ ] ALLOWED_HOSTS configured
- [ ] Database migrated to PostgreSQL
- [ ] All environment variables set
- [ ] SMS service integrated and tested
- [ ] Payment gateway integrated and tested
- [ ] SSL certificates obtained and configured
- [ ] Rate limiting implemented
- [ ] OTP codes removed from API responses
- [ ] Static files configured (WhiteNoise/CDN)
- [ ] Media files configured (S3/CDN)
- [ ] Backup strategy implemented
- [ ] Monitoring tools set up (Sentry, etc.)
- [ ] Logging configured
- [ ] All tests passing
- [ ] Load testing completed
- [ ] Security audit completed

### Post-Deployment

- [ ] Verify HTTPS working correctly
- [ ] Test all critical user flows
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Set up alerts for errors/downtime
- [ ] Create runbook for common issues
- [ ] Document recovery procedures
- [ ] Schedule regular database backups
- [ ] Plan for scaling (if needed)

---

## Compliance & Legal

### 21. Data Privacy & GDPR Compliance

**Required Actions:**
- Add privacy policy
- Add terms of service
- Implement user data export functionality
- Implement user data deletion (right to be forgotten)
- Add cookie consent banner (if using cookies)
- Log user consent

**Example:**
```python
class UserDataExportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            'profile': UserSerializer(user).data,
            'orders': OrderSerializer(user.orders.all(), many=True).data,
            'transactions': TransactionSerializer(user.transactions.all(), many=True).data,
        }
        return Response(data)
```

---

### 22. Financial Regulations

**Considerations:**
- KYC (Know Your Customer) requirements
- AML (Anti-Money Laundering) checks
- Transaction reporting thresholds
- Tax reporting requirements
- Audit trail maintenance

**Actions:**
- Consult with legal team
- Implement KYC verification workflow
- Add transaction limits per regulations
- Maintain detailed audit logs
- Consider financial license requirements

---

## Priority Summary

### Critical (Must Fix Before Launch)
1. ✅ Remove OTP codes from API responses
2. ✅ Implement rate limiting on auth endpoints
3. ✅ Migrate to PostgreSQL
4. ✅ Set up HTTPS/SSL
5. ✅ Integrate SMS service for OTP
6. ✅ Integrate payment gateway
7. ✅ Configure production environment variables
8. ✅ Set up proper static/media file serving

### High Priority (Fix Within First Week)
1. ✅ Set up monitoring and logging
2. ✅ Implement database backups
3. ✅ Add comprehensive rate limiting
4. ✅ Security headers and CSP
5. ✅ Test coverage improvement

### Medium Priority (Fix Within First Month)
1. Token storage security review
2. Caching implementation
3. Database optimization
4. Load testing
5. Input validation improvements

### Low Priority (Ongoing)
1. API documentation access control
2. Performance optimization
3. Feature enhancements

---

## Support & Resources

- Django Security Checklist: https://docs.djangoproject.com/en/5.0/topics/security/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Django Deployment Checklist: `python manage.py check --deploy`

---

**Last Updated:** 2025-01-XX
**Version:** 1.0
