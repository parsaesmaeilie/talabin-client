# 🚀 Talabin Production Deployment Checklist

**Last Updated:** December 27, 2025
**Version:** 1.0.0

---

## ✅ **Phase 1: Critical Security & Configuration**

### 🔐 **1.1 Environment Variables**
- [ ] **Backend** - Create `backend/.env.production` with:
  ```bash
  # Security
  SECRET_KEY=<generate-strong-random-key-min-50-chars>
  DEBUG=False
  ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,api.yourdomain.com

  # Database
  DB_ENGINE=django.db.backends.postgresql
  DB_NAME=talabin_production
  DB_USER=talabin_user
  DB_PASSWORD=<strong-password>
  DB_HOST=db
  DB_PORT=5432

  # Redis
  REDIS_HOST=redis
  REDIS_PORT=6379
  REDIS_PASSWORD=<strong-password>

  # CORS
  CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

  # JWT
  JWT_SECRET_KEY=<different-strong-key>
  JWT_ACCESS_TOKEN_LIFETIME=3600  # 1 hour
  JWT_REFRESH_TOKEN_LIFETIME=86400  # 24 hours

  # SMS Service (Kavenegar/Ghasedak/etc.)
  SMS_PROVIDER=kavenegar
  SMS_API_KEY=<your-sms-api-key>
  SMS_SENDER=<your-sender-number>

  # Email (Optional)
  EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
  EMAIL_HOST=smtp.gmail.com
  EMAIL_PORT=587
  EMAIL_USE_TLS=True
  EMAIL_HOST_USER=<your-email>
  EMAIL_HOST_PASSWORD=<app-password>

  # Gold Price API
  GOLD_PRICE_API_KEY=<your-api-key>
  GOLD_PRICE_UPDATE_INTERVAL=300  # 5 minutes

  # File Storage (Optional - AWS S3)
  USE_S3=False
  AWS_ACCESS_KEY_ID=<your-key>
  AWS_SECRET_ACCESS_KEY=<your-secret>
  AWS_STORAGE_BUCKET_NAME=talabin-media
  AWS_S3_REGION_NAME=eu-west-1

  # Sentry (Error Tracking)
  SENTRY_DSN=<your-sentry-dsn>
  ```

- [ ] **Frontend** - Update `.env.production`:
  ```bash
  NEXT_PUBLIC_API_URL=https://api.yourdomain.com
  NEXT_PUBLIC_APP_NAME=طلابین
  NEXT_PUBLIC_APP_URL=https://yourdomain.com
  NODE_ENV=production

  # Optional
  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
  NEXT_PUBLIC_SENTRY_DSN=<your-frontend-sentry-dsn>
  ```

### 🔒 **1.2 Security Hardening**
- [ ] Generate strong SECRET_KEY: `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`
- [ ] Set `DEBUG=False` in production
- [ ] Configure ALLOWED_HOSTS with your domain
- [ ] Set up HTTPS/SSL certificates (Let's Encrypt recommended)
- [ ] Enable HSTS (already configured in settings)
- [ ] Configure Content Security Policy (CSP)
- [ ] Set secure cookie flags (SECURE_COOKIE, HTTPONLY)
- [ ] Enable rate limiting for authentication endpoints
- [ ] Set up firewall rules (UFW/firewalld)
- [ ] Change default admin URL from `/admin/` to something random

**Commands:**
```bash
# Generate SECRET_KEY
python -c 'import secrets; print(secrets.token_urlsafe(50))'

# Generate strong passwords
openssl rand -base64 32
```

---

## 🗄️ **Phase 2: Database & Data Management**

### 💾 **2.1 Database Setup**
- [ ] Install PostgreSQL on production server
- [ ] Create production database and user
- [ ] Run migrations: `python manage.py migrate`
- [ ] Create superuser: `python manage.py createsuperuser`
- [ ] Load initial data (gold prices, system configs)
- [ ] Set up database connection pooling (PgBouncer)
- [ ] Configure database backups (daily recommended)
- [ ] Test database restore procedure

**Commands:**
```bash
# Create database
createdb -U postgres talabin_production

# Create user
createuser -U postgres talabin_user -P

# Grant permissions
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE talabin_production TO talabin_user;"

# Run migrations
cd backend
python manage.py migrate

# Create superuser
python manage.py createsuperuser --phone_number=<admin-phone>
```

### 📦 **2.2 Backup Strategy**
- [ ] Set up automated daily database backups
- [ ] Configure media file backups
- [ ] Test backup restoration
- [ ] Set up off-site backup storage
- [ ] Document backup/restore procedures

**Example backup script** (`backend/scripts/backup.sh`):
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgres"
DB_NAME="talabin_production"

mkdir -p $BACKUP_DIR
pg_dump -U talabin_user $DB_NAME | gzip > "$BACKUP_DIR/backup_$DATE.sql.gz"

# Keep only last 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete
```

---

## 📁 **Phase 3: Static Files & Media**

### 🖼️ **3.1 Static Files**
- [ ] Run `python manage.py collectstatic --noinput`
- [ ] Configure WhiteNoise for serving static files (already in settings)
- [ ] Set up CDN (CloudFlare/AWS CloudFront) for static assets
- [ ] Enable gzip compression for static files
- [ ] Set proper cache headers (1 year for static assets)

### 📤 **3.2 Media Files**
- [ ] Configure media file storage (S3 recommended for production)
- [ ] Set up media file permissions
- [ ] Configure media file backups
- [ ] Set up image optimization pipeline
- [ ] Configure file upload size limits

**Commands:**
```bash
# Collect static files
cd backend
python manage.py collectstatic --noinput
```

---

## ⚡ **Phase 4: Performance Optimization**

### 🚄 **4.1 Caching**
- [ ] Configure Redis cache (already in docker-compose)
- [ ] Enable Django cache framework
- [ ] Cache gold price data (5-minute intervals)
- [ ] Cache wallet balance queries
- [ ] Set up query result caching
- [ ] Configure browser caching headers

### 📊 **4.2 Database Optimization**
- [ ] Add database indexes for frequently queried fields
- [ ] Enable PostgreSQL query logging (slow queries)
- [ ] Set up connection pooling (PgBouncer)
- [ ] Optimize N+1 queries with `select_related()`/`prefetch_related()`
- [ ] Add database query monitoring

### 🎨 **4.3 Frontend Optimization**
- [ ] Run production build: `npm run build`
- [ ] Enable Next.js image optimization
- [ ] Configure CDN for static assets
- [ ] Enable response compression
- [ ] Optimize bundle size (analyze with `@next/bundle-analyzer`)
- [ ] Set up asset preloading for critical resources

**Commands:**
```bash
# Build frontend
npm run build

# Analyze bundle size
npm install @next/bundle-analyzer
npm run analyze
```

---

## 🔍 **Phase 5: Monitoring & Logging**

### 📈 **5.1 Application Monitoring**
- [ ] Set up Sentry for error tracking (backend + frontend)
- [ ] Configure application performance monitoring (APM)
- [ ] Set up uptime monitoring (UptimeRobot/Pingdom)
- [ ] Configure health check endpoints
- [ ] Set up alerts for critical errors

### 📝 **5.2 Logging**
- [ ] Configure centralized logging (ELK Stack/Papertrail)
- [ ] Set up log rotation
- [ ] Configure different log levels for environments
- [ ] Log all authentication attempts
- [ ] Log all financial transactions
- [ ] Set up log alerts for suspicious activity

**Log Configuration** (add to `settings.py`):
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
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/app/logs/django.log',
            'maxBytes': 10485760,  # 10MB
            'backupCount': 5,
            'formatter': 'verbose',
        },
        'sentry': {
            'level': 'ERROR',
            'class': 'sentry_sdk.integrations.logging.EventHandler',
        },
    },
    'root': {
        'handlers': ['file', 'sentry'],
        'level': 'INFO',
    },
}
```

---

## 🧪 **Phase 6: Testing**

### ✅ **6.1 Backend Testing**
- [ ] Write unit tests for critical business logic
- [ ] Test all API endpoints
- [ ] Test authentication flow (login, OTP, logout)
- [ ] Test trading operations (buy/sell)
- [ ] Test wallet operations (deposit/withdraw)
- [ ] Run security tests (SQL injection, XSS, CSRF)
- [ ] Load testing with realistic traffic

**Commands:**
```bash
# Run Django tests
cd backend
python manage.py test

# Install pytest for better testing
pip install pytest pytest-django pytest-cov
pytest --cov=apps
```

### ✅ **6.2 Frontend Testing**
- [ ] Test authentication flows
- [ ] Test all user journeys
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing
- [ ] Performance testing (Lighthouse score)
- [ ] Accessibility testing (WCAG compliance)

### ✅ **6.3 Integration Testing**
- [ ] Test frontend-backend integration
- [ ] Test payment gateway integration
- [ ] Test SMS/OTP delivery
- [ ] Test email notifications
- [ ] Test background tasks (Celery)

---

## 🐳 **Phase 7: Docker & Deployment**

### 📦 **7.1 Docker Images**
- [ ] Create `backend/Dockerfile.production`
- [ ] Create `Dockerfile.production` (frontend)
- [ ] Build and test Docker images locally
- [ ] Push images to container registry (Docker Hub/AWS ECR/GitLab Registry)
- [ ] Set up multi-stage builds for smaller images
- [ ] Configure health checks in Docker containers

**Backend Dockerfile** (`backend/Dockerfile.production`):
```dockerfile
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy application
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Create non-root user
RUN useradd -m -u 1000 talabin && chown -R talabin:talabin /app
USER talabin

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

**Frontend Dockerfile** (`Dockerfile.production`):
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

### 🚀 **7.2 Deployment**
- [ ] Set up production server (VPS/AWS EC2/DigitalOcean)
- [ ] Install Docker and Docker Compose on server
- [ ] Clone repository to production server
- [ ] Configure environment variables
- [ ] Run `docker-compose -f docker-compose.production.yml up -d`
- [ ] Configure reverse proxy (Nginx - already in docker-compose)
- [ ] Set up SSL certificates (Certbot/Let's Encrypt)
- [ ] Configure domain DNS records
- [ ] Test deployment

**Deployment Commands:**
```bash
# On production server
git clone <your-repo-url> /var/www/talabin
cd /var/www/talabin

# Copy environment files
cp .env.example .env.production
cp backend/.env.example backend/.env.production

# Edit environment files with production values
nano .env.production
nano backend/.env.production

# Build and start containers
docker-compose -f docker-compose.production.yml build
docker-compose -f docker-compose.production.yml up -d

# Check logs
docker-compose -f docker-compose.production.yml logs -f

# Run migrations
docker-compose -f docker-compose.production.yml exec backend python manage.py migrate

# Create superuser
docker-compose -f docker-compose.production.yml exec backend python manage.py createsuperuser
```

---

## 🌐 **Phase 8: Domain & SSL**

### 🔐 **8.1 SSL/TLS Certificates**
- [ ] Purchase/configure domain name
- [ ] Point DNS A records to server IP
- [ ] Install Certbot for Let's Encrypt
- [ ] Generate SSL certificates
- [ ] Configure Nginx for HTTPS
- [ ] Set up automatic certificate renewal
- [ ] Test SSL configuration (SSLLabs)

**Commands:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificates
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Test renewal
sudo certbot renew --dry-run

# Auto-renewal (cron)
sudo crontab -e
# Add: 0 3 * * * certbot renew --quiet
```

### 📡 **8.2 DNS Configuration**
```
A Record: yourdomain.com → <server-ip>
A Record: www.yourdomain.com → <server-ip>
A Record: api.yourdomain.com → <server-ip>
```

---

## 📱 **Phase 9: Third-Party Services**

### 📲 **9.1 SMS Service**
- [ ] Sign up for SMS provider (Kavenegar, Ghasedak, or international provider)
- [ ] Get API credentials
- [ ] Configure SMS settings in backend
- [ ] Test OTP delivery
- [ ] Set up SMS delivery monitoring
- [ ] Configure fallback SMS provider

**Recommended Iranian SMS Providers:**
- Kavenegar (https://kavenegar.com)
- Ghasedak (https://ghasedak.me)
- Faraz SMS (https://sms.ir)

### 📧 **9.2 Email Service** (Optional)
- [ ] Set up email service (Gmail/SendGrid/AWS SES)
- [ ] Configure SMTP settings
- [ ] Create email templates
- [ ] Test email delivery

### 💳 **9.3 Payment Gateway** (Future)
- [ ] Research Iranian payment gateways (Zarinpal, IDPay, etc.)
- [ ] Sign up and get merchant credentials
- [ ] Integrate payment API
- [ ] Test payment flows in sandbox

---

## 📄 **Phase 10: Documentation & Compliance**

### 📚 **10.1 Documentation**
- [ ] API documentation (already using drf-spectacular)
- [ ] User manual (Persian)
- [ ] Admin dashboard guide
- [ ] Deployment documentation
- [ ] Disaster recovery procedures
- [ ] Runbook for common issues

### ⚖️ **10.2 Legal Compliance**
- [ ] Create Terms of Service (Persian)
- [ ] Create Privacy Policy (Persian)
- [ ] GDPR compliance (if applicable)
- [ ] User consent for data collection
- [ ] Cookie policy
- [ ] KYC/AML compliance for financial transactions

### 🛡️ **10.3 Security Compliance**
- [ ] Regular security audits
- [ ] Penetration testing
- [ ] Data encryption at rest and in transit
- [ ] PCI DSS compliance (if handling card data)
- [ ] Regular dependency updates
- [ ] Security incident response plan

---

## 🔄 **Phase 11: CI/CD Pipeline** (Optional but Recommended)

### ⚙️ **11.1 Continuous Integration**
- [ ] Set up GitHub Actions / GitLab CI
- [ ] Automated testing on push
- [ ] Code quality checks (linting, type checking)
- [ ] Security scanning (Snyk/Dependabot)
- [ ] Build Docker images automatically

**Example GitHub Actions** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          cd backend
          pip install -r requirements.txt
          python manage.py test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/talabin
            git pull origin main
            docker-compose -f docker-compose.production.yml up -d --build
```

---

## 🎯 **Phase 12: Post-Deployment**

### ✅ **12.1 Post-Launch Checklist**
- [ ] Monitor error logs for 24 hours
- [ ] Check all critical user flows
- [ ] Verify SMS/OTP delivery
- [ ] Test gold price updates
- [ ] Monitor server resources (CPU, RAM, disk)
- [ ] Set up alerts for high error rates
- [ ] Create backup of production database
- [ ] Document any issues encountered

### 📊 **12.2 Monitoring Dashboard**
- [ ] Set up Grafana/Prometheus for metrics
- [ ] Monitor API response times
- [ ] Track user registrations
- [ ] Monitor trading volumes
- [ ] Track error rates
- [ ] Set up custom alerts

### 🔧 **12.3 Maintenance Plan**
- [ ] Weekly dependency updates
- [ ] Monthly security patches
- [ ] Quarterly security audits
- [ ] Regular database optimization
- [ ] Performance reviews
- [ ] User feedback collection

---

## 🚨 **Critical Pre-Launch Items**

**Must be completed before going live:**

1. ✅ All environment variables configured
2. ✅ SSL certificates installed
3. ✅ Database backups automated
4. ✅ Error tracking (Sentry) configured
5. ✅ SMS service working
6. ✅ All tests passing
7. ✅ Admin panel secured (URL changed from /admin/)
8. ✅ DEBUG=False
9. ✅ ALLOWED_HOSTS configured
10. ✅ CORS configured correctly

---

## 📞 **Support & Emergency Contacts**

```
Server Provider: _______________
Domain Registrar: _______________
SSL Provider: Let's Encrypt
SMS Service: _______________
Email Service: _______________
Database Backups: _______________
Emergency Contact: _______________
```

---

## 🎉 **Ready to Deploy?**

**Final Pre-Flight Check:**
```bash
# 1. Build everything locally first
docker-compose -f docker-compose.production.yml build

# 2. Test locally with production config
docker-compose -f docker-compose.production.yml up

# 3. Run tests
cd backend && python manage.py test
cd .. && npm run test (if tests exist)

# 4. Check for security issues
cd backend && python manage.py check --deploy

# 5. Verify all environment variables
grep -r "TODO\|CHANGEME\|FIXME" .env* backend/.env*
```

---

**Good luck with your deployment! 🚀**

*For questions or issues, refer to the documentation or create an issue in the repository.*
