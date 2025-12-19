# 🚀 Talabin Gold Trading Platform - Production Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Database Setup](#database-setup)
6. [Nginx Configuration](#nginx-configuration)
7. [SSL Setup](#ssl-setup)
8. [Monitoring](#monitoring)
9. [Backup Strategy](#backup-strategy)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Knowledge
- Basic Linux command line
- SSH access to server
- DNS management
- Basic database knowledge

### Required Services
- ✅ Ubuntu 22.04 LTS server (2GB RAM minimum, 4GB recommended)
- ✅ Domain name with DNS access
- ✅ Kavenegar SMS account
- ✅ Email service (Gmail/SMTP)

### Local Requirements
- Git installed
- SSH key configured
- Access to project repository

---

## Server Setup

### 1. Initial Server Configuration

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y python3-pip python3-venv nginx postgresql postgresql-contrib redis-server supervisor certbot python3-certbot-nginx git curl

# Create application user
sudo useradd -m -s /bin/bash talabin
sudo usermod -aG sudo talabin

# Switch to talabin user
sudo su - talabin
```

### 2. Set up Firewall

```bash
# Configure UFW
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Database Setup

### 1. Create PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE talabin_production;
CREATE USER talabin_user WITH PASSWORD 'your-strong-password-here';

# Grant privileges
ALTER ROLE talabin_user SET client_encoding TO 'utf8';
ALTER ROLE talabin_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE talabin_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE talabin_production TO talabin_user;

# Exit PostgreSQL
\q
```

### 2. Configure PostgreSQL for Production

```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/14/main/postgresql.conf

# Update these settings:
max_connections = 100
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 7864kB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200

# Restart PostgreSQL
sudo systemctl restart postgresql
```

---

## Backend Deployment

### 1. Clone Repository

```bash
# Clone project
cd /home/talabin
git clone https://github.com/yourusername/talabin-client.git
cd talabin-client/backend
```

### 2. Set up Python Environment

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn psycopg2-binary
```

### 3. Configure Environment

```bash
# Create production .env file
nano .env

# Add production configuration:
```

```env
# Copy from .env.production.example and fill in:
DEBUG=False
SECRET_KEY=your-generated-secret-key-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,api.yourdomain.com

DB_ENGINE=django.db.backends.postgresql
DB_NAME=talabin_production
DB_USER=talabin_user
DB_PASSWORD=your-database-password
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# SMS Configuration
KAVENEGAR_API_KEY=your-kavenegar-api-key
SMS_SENDER=10008663
SMS_DEBUG_MODE=False

# ... other settings
```

### 4. Run Migrations & Setup

```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Create test data (optional for staging)
python create_test_data.py
```

### 5. Test Gunicorn

```bash
# Test gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000

# If successful, stop with Ctrl+C
```

### 6. Create Gunicorn Service

```bash
# Create gunicorn service file
sudo nano /etc/systemd/system/gunicorn.service
```

```ini
[Unit]
Description=Gunicorn daemon for Talabin Django Application
After=network.target

[Service]
User=talabin
Group=www-data
WorkingDirectory=/home/talabin/talabin-client/backend
Environment="PATH=/home/talabin/talabin-client/backend/venv/bin"
ExecStart=/home/talabin/talabin-client/backend/venv/bin/gunicorn \
          --workers 3 \
          --bind unix:/home/talabin/talabin-client/backend/gunicorn.sock \
          --access-logfile /home/talabin/logs/gunicorn-access.log \
          --error-logfile /home/talabin/logs/gunicorn-error.log \
          --log-level info \
          config.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
# Create log directory
mkdir -p /home/talabin/logs

# Start and enable Gunicorn
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo systemctl status gunicorn
```

---

## Frontend Deployment

### 1. Install Node.js

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Build Frontend

```bash
# Navigate to frontend
cd /home/talabin/talabin-client

# Install dependencies
npm install

# Create production .env.local
nano .env.local
```

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

```bash
# Build for production
npm run build

# Test production build locally
npm start

# If successful, stop with Ctrl+C
```

### 3. Set up PM2 for Frontend

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start Next.js with PM2
pm2 start npm --name "talabin-frontend" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup systemd
# Run the command it outputs

# Check status
pm2 status
pm2 logs talabin-frontend
```

---

## Nginx Configuration

### 1. Create Nginx Configuration

```bash
# Create Nginx config file
sudo nano /etc/nginx/sites-available/talabin
```

```nginx
# Backend API Configuration
server {
    listen 80;
    server_name api.yourdomain.com;

    client_max_body_size 20M;

    location = /favicon.ico { access_log off; log_not_found off; }

    location /static/ {
        alias /home/talabin/talabin-client/backend/staticfiles/;
    }

    location /media/ {
        alias /home/talabin/talabin-client/backend/media/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/talabin/talabin-client/backend/gunicorn.sock;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
        proxy_redirect off;
    }
}

# Frontend Configuration
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/talabin /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## SSL Setup

### 1. Install SSL with Certbot

```bash
# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Follow prompts and choose to redirect HTTP to HTTPS

# Test auto-renewal
sudo certbot renew --dry-run
```

### 2. Verify SSL

```bash
# Check SSL certificate
sudo certbot certificates

# The certificate will auto-renew via cron/systemd timer
```

---

## Monitoring Setup

### 1. Set up System Monitoring

```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Monitor processes
htop

# Monitor disk I/O
sudo iotop

# Monitor network
sudo nethogs
```

### 2. Set up Log Rotation

```bash
# Create logrotate config
sudo nano /etc/logrotate.d/talabin
```

```
/home/talabin/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 talabin www-data
    sharedscripts
    postrotate
        systemctl reload gunicorn
    endscript
}
```

### 3. Application Monitoring

```bash
# View Gunicorn logs
sudo journalctl -u gunicorn -f

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View PM2 logs
pm2 logs talabin-frontend

# View application logs
tail -f /home/talabin/logs/gunicorn-access.log
tail -f /home/talabin/logs/gunicorn-error.log
```

---

## Backup Strategy

### 1. Database Backup Script

```bash
# Create backup script
nano /home/talabin/scripts/backup-db.sh
```

```bash
#!/bin/bash
# Database backup script

BACKUP_DIR="/home/talabin/backups/database"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="talabin_production"
DB_USER="talabin_user"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup
PGPASSWORD='your-db-password' pg_dump -U $DB_USER -h localhost $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/backup_$DATE.sql

# Keep only last 30 days of backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

```bash
# Make executable
chmod +x /home/talabin/scripts/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e

# Add this line:
0 2 * * * /home/talabin/scripts/backup-db.sh >> /home/talabin/logs/backup.log 2>&1
```

### 2. Media Files Backup

```bash
# Create media backup script
nano /home/talabin/scripts/backup-media.sh
```

```bash
#!/bin/bash
# Media files backup script

BACKUP_DIR="/home/talabin/backups/media"
MEDIA_DIR="/home/talabin/talabin-client/backend/media"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Create backup
tar -czf $BACKUP_DIR/media_backup_$DATE.tar.gz -C $MEDIA_DIR .

# Keep only last 30 days
find $BACKUP_DIR -name "media_backup_*.tar.gz" -mtime +30 -delete

echo "Media backup completed: media_backup_$DATE.tar.gz"
```

```bash
# Make executable
chmod +x /home/talabin/scripts/backup-media.sh

# Add to crontab (weekly on Sunday at 3 AM)
0 3 * * 0 /home/talabin/scripts/backup-media.sh >> /home/talabin/logs/backup.log 2>&1
```

---

## Troubleshooting

### Common Issues

#### 1. Gunicorn Won't Start

```bash
# Check logs
sudo journalctl -u gunicorn -n 50

# Check if socket file exists
ls -l /home/talabin/talabin-client/backend/gunicorn.sock

# Restart service
sudo systemctl restart gunicorn
```

#### 2. Nginx 502 Bad Gateway

```bash
# Check Gunicorn is running
sudo systemctl status gunicorn

# Check Nginx configuration
sudo nginx -t

# Check socket permissions
ls -l /home/talabin/talabin-client/backend/gunicorn.sock
```

#### 3. Static Files Not Loading

```bash
# Collect static files again
cd /home/talabin/talabin-client/backend
source venv/bin/activate
python manage.py collectstatic --noinput

# Check Nginx static file path
sudo nginx -t
```

#### 4. Database Connection Issues

```bash
# Test database connection
sudo -u postgres psql -d talabin_production

# Check PostgreSQL is running
sudo systemctl status postgresql

# Check pg_hba.conf allows connections
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

#### 5. Frontend Not Loading

```bash
# Check PM2 status
pm2 status

# Check PM2 logs
pm2 logs talabin-frontend

# Restart frontend
pm2 restart talabin-frontend
```

---

## Deployment Updates

### Backend Updates

```bash
# Pull latest code
cd /home/talabin/talabin-client
git pull origin main

# Activate virtualenv
cd backend
source venv/bin/activate

# Install new dependencies (if any)
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Restart Gunicorn
sudo systemctl restart gunicorn
```

### Frontend Updates

```bash
# Pull latest code
cd /home/talabin/talabin-client
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart PM2
pm2 restart talabin-frontend
```

---

## Performance Optimization

### 1. Enable Gzip Compression

```nginx
# Add to Nginx server block
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. Set up Redis Caching

```bash
# Install Redis
sudo apt install redis-server

# Configure Django to use Redis
# Add to settings.py
```

```python
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}
```

### 3. Database Connection Pooling

```bash
# Install PgBouncer
sudo apt install pgbouncer

# Configure connection pooling
sudo nano /etc/pgbouncer/pgbouncer.ini
```

---

## Security Hardening

### 1. Fail2Ban Setup

```bash
# Install Fail2Ban
sudo apt install fail2ban

# Create local config
sudo nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[nginx-http-auth]
enabled = true

[nginx-noscript]
enabled = true

[nginx-badbots]
enabled = true
```

```bash
# Start Fail2Ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 2. Disable Root SSH Login

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Set:
PermitRootLogin no
PasswordAuthentication no

# Restart SSH
sudo systemctl restart sshd
```

---

## Final Checklist

- [ ] All services running (Gunicorn, Nginx, PM2, PostgreSQL, Redis)
- [ ] SSL certificates installed and auto-renew configured
- [ ] Firewall configured
- [ ] Database backups scheduled
- [ ] Logs rotating properly
- [ ] Monitoring set up
- [ ] Security hardening applied
- [ ] Domain DNS pointing to server
- [ ] All environment variables set correctly
- [ ] Test all user flows in production

---

**Deployment Complete! 🎉**

Your Talabin Gold Trading Platform is now live in production.

For support or issues, refer to the troubleshooting section above.

**Last Updated:** December 19, 2025
