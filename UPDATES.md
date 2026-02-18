# Talabin - Update Log

## Update: Payment Result Pages & Production Readiness (2026-02-18)

### Payment Success Page (`/payment/success`)

Completely redesigned to match Figma specifications:

- **White clean background** instead of green gradient
- **Green pill badge** "پرداخت موفق" at the top
- **Custom SVG illustration** (checkmark with hand) replaces emoji icon
- **Transaction detail rows** with proper labels:
  - Purchase type (خرید ۱ گرم طلا)
  - Commission (کمیسیون طلابین)
  - Price per gram (قیمت هر گرم طلا)
  - Gold weight (وزن طلا)
  - Purchase date (تاریخ خرید)
  - Tracking code (رمز پیگیری)
- **Confirmation note**: "خرید شما نهایی شد و دارایی طلا شما به کیف‌پولتان اضافه شد."
- **Two action buttons**: Green "دانلود فاکتور" + Grey "بازگشت به خانه"
- Removed: auto-redirect countdown, wallet info card, emoji icons

**URL Parameters:**
- `goldAmount` - Amount of gold purchased (default: ۱)
- `commission` - Commission amount (default: ۱۰,۰۰۰)
- `totalPrice` - Price per gram (default: ۳۱,۵۰۰,۰۰۰)
- `weight` - Gold weight in grams (default: ۱)
- `date` - Purchase date
- `trackingCode` - Tracking code (default: ۴۴۶۵۲)

---

### Payment Failure Page (`/payment/failure`)

Completely redesigned to match Figma specifications:

- **White clean background** instead of red gradient
- **Orange pill badge** "تراکنش ناموفق" at the top
- **Custom SVG illustration** (X-mark with hand) replaces emoji icon
- **Title**: "تراکنش ناموفق."
- **Description**: Explains the payment issue and 72-hour refund guarantee
- **Single orange "تلاش مجدد" button** at the bottom
- Removed: transaction detail card, common failure reasons list, support contact card, emoji icons

---

### New Assets Added

| File | Description |
|------|-------------|
| `public/assets/illustrations/payment-success.svg` | Green checkmark illustration for success page |
| `public/assets/illustrations/payment-failure.svg` | Orange X-mark illustration for failure page |
| `assets/Mask group.svg` | Source SVG - success variant 1 |
| `assets/Mask group-1.svg` | Source SVG - success variant 2 |
| `assets/Mask group-2.svg` | Source SVG - failure variant 1 |
| `assets/Mask group-3.svg` | Source SVG - failure variant 2 |
| `assets/Mask group (2).svg` | Source SVG - success duplicate |

---

### Production Readiness Fixes (Previous Commit)

| Fix | File(s) |
|-----|---------|
| Frontend Dockerfile: use full `npm ci` (devDeps needed for build) | `Dockerfile.production` |
| Created missing `nginx.conf` main config | `nginx/nginx.conf` |
| Redis password support in Celery broker URL | `backend/config/settings.py` |
| Added `django-celery-beat` to requirements & INSTALLED_APPS | `backend/requirements.txt`, `backend/config/settings.py` |
| Replaced deprecated `STATICFILES_STORAGE` with Django 5 `STORAGES` | `backend/config/settings.py` |
| Internal-only ports, certbot integration, named volumes | `docker-compose.production.yml` |
| Added `REDIS_PASSWORD` to env example | `backend/.env.production.example` |
| Added `/health` endpoint for Docker healthcheck | `nginx/conf.d/talabin.conf` |
| Comprehensive deployment script | `deploy.sh` |

---

### Deployment Script (`deploy.sh`)

Full server deployment automation:

```bash
./deploy.sh setup            # First-time server setup
./deploy.sh ssl              # Obtain SSL certificates
./deploy.sh deploy           # Deploy/update application
./deploy.sh backup           # Backup database
./deploy.sh restore          # Restore from backup
./deploy.sh rollback         # Rollback to previous deploy
./deploy.sh logs [service]   # View logs
./deploy.sh status           # Service status
./deploy.sh stop             # Stop services
./deploy.sh restart [svc]    # Restart services
./deploy.sh createsuperuser  # Create Django admin
```
