# Deployment Guide

This guide covers deploying the Talabin backend to production.

## Quick Deploy with Docker

### Prerequisites

- Docker and Docker Compose installed
- Domain name configured
- SSL certificate (Let's Encrypt recommended)

### Steps

1. **Clone and configure**

```bash
cd backend
cp .env.example .env
# Edit .env with production settings
```

2. **Build and run**

```bash
docker-compose up -d
```

3. **Run migrations**

```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

4. **Collect static files**

```bash
docker-compose exec backend python manage.py collectstatic --noinput
```

## Manual Deployment (Ubuntu/Debian)

### 1. System Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and PostgreSQL
sudo apt install python3.11 python3.11-venv python3-pip postgresql postgresql-contrib redis-server nginx -y
```

### 2. Database Setup

```bash
sudo -u postgres psql

CREATE DATABASE talabin_db;
CREATE USER talabin_user WITH PASSWORD 'your_secure_password';
ALTER ROLE talabin_user SET client_encoding TO 'utf8';
ALTER ROLE talabin_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE talabin_user SET timezone TO 'Asia/Tehran';
GRANT ALL PRIVILEGES ON DATABASE talabin_db TO talabin_user;
\q
```

### 3. Application Setup

```bash
# Create app directory
sudo mkdir -p /var/www/talabin
cd /var/www/talabin

# Clone repository
git clone <your-repo> .

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn

# Configure environment
cp .env.example .env
nano .env  # Edit with production settings
```

### 4. Django Setup

```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

### 5. Gunicorn Setup

Create `/etc/systemd/system/talabin.service`:

```ini
[Unit]
Description=Talabin Django Application
After=network.target

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/talabin
Environment="PATH=/var/www/talabin/venv/bin"
ExecStart=/var/www/talabin/venv/bin/gunicorn \
          --workers 3 \
          --bind unix:/var/www/talabin/talabin.sock \
          config.wsgi:application

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl start talabin
sudo systemctl enable talabin
```

### 6. Celery Setup

Create `/etc/systemd/system/talabin-celery.service`:

```ini
[Unit]
Description=Talabin Celery Worker
After=network.target

[Service]
Type=forking
User=www-data
Group=www-data
WorkingDirectory=/var/www/talabin
Environment="PATH=/var/www/talabin/venv/bin"
ExecStart=/var/www/talabin/venv/bin/celery -A config worker --detach

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl start talabin-celery
sudo systemctl enable talabin-celery
```

### 7. Nginx Configuration

Create `/etc/nginx/sites-available/talabin`:

```nginx
upstream talabin {
    server unix:/var/www/talabin/talabin.sock;
}

server {
    listen 80;
    server_name your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    client_max_body_size 10M;

    location /static/ {
        alias /var/www/talabin/staticfiles/;
    }

    location /media/ {
        alias /var/www/talabin/media/;
    }

    location / {
        proxy_pass http://talabin;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/talabin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 9. Security Hardening

```bash
# Set proper permissions
sudo chown -R www-data:www-data /var/www/talabin
sudo chmod -R 755 /var/www/talabin

# Configure firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## Environment Variables for Production

Update `.env` with production values:

```env
DEBUG=False
SECRET_KEY=<generate-strong-random-key>
ALLOWED_HOSTS=your-domain.com,www.your-domain.com

DB_ENGINE=django.db.backends.postgresql
DB_NAME=talabin_db
DB_USER=talabin_user
DB_PASSWORD=<secure-password>
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

## Monitoring and Logging

### Setup Logging

Update `settings.py`:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/var/log/talabin/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
```

### Monitoring with Sentry

```bash
pip install sentry-sdk
```

Add to `settings.py`:

```python
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)
```

## Backup Strategy

### Database Backups

Create backup script `/usr/local/bin/backup-talabin-db.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/talabin"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mkdir -p $BACKUP_DIR

pg_dump -U talabin_user talabin_db > "$BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete
```

Add to crontab:

```bash
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-talabin-db.sh
```

## Updating Application

```bash
cd /var/www/talabin
source venv/bin/activate

# Pull latest changes
git pull

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Restart services
sudo systemctl restart talabin
sudo systemctl restart talabin-celery
```

## Health Check Endpoints

Add to your monitoring:

- `/admin/` - Admin panel (should return 200 or redirect)
- `/api/prices/gold/current/` - Public endpoint

## Troubleshooting

### Check logs

```bash
# Application logs
sudo journalctl -u talabin -f

# Celery logs
sudo journalctl -u talabin-celery -f

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Restart services

```bash
sudo systemctl restart talabin
sudo systemctl restart talabin-celery
sudo systemctl restart nginx
```

## Performance Optimization

### Database

```sql
-- Create indexes
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);
CREATE INDEX idx_transactions_user_created ON transactions(user_id, created_at DESC);
```

### Redis Caching

Configure Redis for session storage and caching in `settings.py`:

```python
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```
