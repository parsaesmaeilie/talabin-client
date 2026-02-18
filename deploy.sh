#!/usr/bin/env bash
# ==========================================================================
#  Talabin - Production Deployment Script
#  Gold Trading Platform (https://github.com/your-org/talabin-client)
#
#  Usage:
#    ./deploy.sh setup       - First-time server setup (run once)
#    ./deploy.sh deploy      - Deploy or update the application
#    ./deploy.sh ssl         - Obtain/renew SSL certificates
#    ./deploy.sh backup      - Backup database
#    ./deploy.sh restore     - Restore database from backup
#    ./deploy.sh logs        - Tail all service logs
#    ./deploy.sh status      - Show service status
#    ./deploy.sh rollback    - Rollback to previous deployment
#    ./deploy.sh stop        - Stop all services
#    ./deploy.sh restart     - Restart all services
# ==========================================================================

set -euo pipefail

# ===================== CONFIGURATION =====================
# Override these in a .deploy.env file or export them before running

PROJECT_NAME="${PROJECT_NAME:-talabin}"
PROJECT_DIR="${PROJECT_DIR:-/opt/talabin}"
REPO_URL="${REPO_URL:-https://github.com/your-org/talabin-client.git}"
BRANCH="${BRANCH:-main}"
DOMAIN="${DOMAIN:-yourdomain.com}"
API_DOMAIN="${API_DOMAIN:-api.yourdomain.com}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@yourdomain.com}"
COMPOSE_FILE="docker-compose.production.yml"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ===================== HELPER FUNCTIONS =====================

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

confirm() {
    read -r -p "$1 [y/N]: " response
    case "$response" in
        [yY][eE][sS]|[yY]) true ;;
        *) false ;;
    esac
}

check_root() {
    if [ "$(id -u)" -ne 0 ]; then
        log_error "This script must be run as root (use sudo)"
        exit 1
    fi
}

load_env() {
    if [ -f ".deploy.env" ]; then
        log_info "Loading configuration from .deploy.env"
        set -a
        source .deploy.env
        set +a
    fi
}

# ===================== SETUP (First-time) =====================

cmd_setup() {
    check_root
    log_info "============================================"
    log_info "  Talabin - First-Time Server Setup"
    log_info "============================================"
    echo ""

    # ---------- 1. System Update ----------
    log_info "Step 1/8: Updating system packages..."
    apt-get update -y && apt-get upgrade -y
    log_success "System updated"

    # ---------- 2. Install Dependencies ----------
    log_info "Step 2/8: Installing dependencies..."
    apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        git \
        ufw \
        fail2ban \
        htop \
        unzip \
        software-properties-common
    log_success "Dependencies installed"

    # ---------- 3. Install Docker ----------
    log_info "Step 3/8: Installing Docker..."
    if command -v docker &> /dev/null; then
        log_warn "Docker already installed: $(docker --version)"
    else
        curl -fsSL https://get.docker.com | sh
        systemctl enable docker
        systemctl start docker
        log_success "Docker installed: $(docker --version)"
    fi

    # ---------- 4. Install Docker Compose ----------
    log_info "Step 4/8: Installing Docker Compose..."
    if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
        log_warn "Docker Compose already installed"
    else
        # Docker Compose V2 (plugin)
        apt-get install -y docker-compose-plugin
        log_success "Docker Compose installed"
    fi

    # ---------- 5. Configure Firewall ----------
    log_info "Step 5/8: Configuring firewall..."
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow ssh
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    log_success "Firewall configured (SSH, HTTP, HTTPS allowed)"

    # ---------- 6. Configure Fail2Ban ----------
    log_info "Step 6/8: Configuring Fail2Ban..."
    systemctl enable fail2ban
    systemctl start fail2ban
    log_success "Fail2Ban enabled"

    # ---------- 7. Create Project Directory ----------
    log_info "Step 7/8: Setting up project directory..."
    mkdir -p "$PROJECT_DIR"
    cd "$PROJECT_DIR"

    if [ -d ".git" ]; then
        log_warn "Repository already cloned, pulling latest..."
        git fetch origin
        git checkout "$BRANCH"
        git pull origin "$BRANCH"
    else
        git clone -b "$BRANCH" "$REPO_URL" .
    fi
    log_success "Repository ready at $PROJECT_DIR"

    # ---------- 8. Generate Environment Files ----------
    log_info "Step 8/8: Setting up environment files..."

    if [ ! -f "backend/.env.production" ]; then
        log_info "Creating backend/.env.production from template..."
        cp backend/.env.production.example backend/.env.production

        # Generate a real Django secret key
        DJANGO_SECRET=$(python3 -c "import secrets; print(secrets.token_urlsafe(50))" 2>/dev/null || openssl rand -base64 50)
        sed -i "s|CHANGE-THIS-TO-A-STRONG-RANDOM-SECRET-KEY|${DJANGO_SECRET}|g" backend/.env.production

        # Generate a real DB password
        DB_PASS=$(openssl rand -base64 32 | tr -d '=/+' | head -c 32)
        sed -i "s|STRONG-DATABASE-PASSWORD-HERE|${DB_PASS}|g" backend/.env.production

        # Generate a real Redis password
        REDIS_PASS=$(openssl rand -base64 32 | tr -d '=/+' | head -c 32)
        sed -i "s|STRONG-REDIS-PASSWORD-HERE|${REDIS_PASS}|g" backend/.env.production

        # Replace domain placeholders
        sed -i "s|yourdomain.com|${DOMAIN}|g" backend/.env.production
        sed -i "s|api.yourdomain.com|${API_DOMAIN}|g" backend/.env.production

        log_warn "IMPORTANT: Edit backend/.env.production and fill in:"
        log_warn "  - Email credentials (EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)"
        log_warn "  - SMS API key (KAVENEGAR_API_KEY)"
        log_warn "  - Payment gateway (ZARINPAL_MERCHANT_ID)"
        log_success "Environment file created with auto-generated secrets"
    else
        log_warn "backend/.env.production already exists, skipping..."
    fi

    # Create the .env file for docker-compose variables
    if [ ! -f ".env" ]; then
        log_info "Creating root .env for docker-compose..."
        # Extract passwords from backend env
        DB_PASS=$(grep '^DB_PASSWORD=' backend/.env.production | cut -d= -f2)
        DB_USER=$(grep '^DB_USER=' backend/.env.production | cut -d= -f2)
        DB_NAME=$(grep '^DB_NAME=' backend/.env.production | cut -d= -f2)
        REDIS_PASS=$(grep '^REDIS_PASSWORD=' backend/.env.production | cut -d= -f2)

        cat > .env <<ENVEOF
# Docker Compose environment variables
# These are used by docker-compose.production.yml

DB_NAME=${DB_NAME:-talabin_production}
DB_USER=${DB_USER:-talabin_user}
DB_PASSWORD=${DB_PASS}
REDIS_PASSWORD=${REDIS_PASS}
FRONTEND_API_URL=https://${API_DOMAIN}
GUNICORN_WORKERS=4
CELERY_CONCURRENCY=4
ENVEOF
        log_success "Root .env created"
    fi

    # ---------- Create required directories ----------
    mkdir -p nginx/ssl nginx/logs backend/backups backend/logs backend/media

    # ---------- Update nginx config with real domain ----------
    sed -i "s|yourdomain.com|${DOMAIN}|g" nginx/conf.d/talabin.conf
    sed -i "s|api.yourdomain.com|${API_DOMAIN}|g" nginx/conf.d/talabin.conf

    echo ""
    log_success "============================================"
    log_success "  Setup complete!"
    log_success "============================================"
    echo ""
    log_info "Next steps:"
    echo "  1. Edit backend/.env.production with your API keys"
    echo "  2. Run: ./deploy.sh ssl       (to get SSL certificates)"
    echo "  3. Run: ./deploy.sh deploy     (to start the application)"
    echo ""
}

# ===================== SSL CERTIFICATE =====================

cmd_ssl() {
    check_root
    cd "$PROJECT_DIR"
    load_env

    log_info "============================================"
    log_info "  SSL Certificate Setup (Let's Encrypt)"
    log_info "============================================"

    # First, create a temporary nginx config that works without SSL
    log_info "Creating temporary nginx config for certificate validation..."

    cat > nginx/conf.d/temp-ssl.conf <<'SSLEOF'
server {
    listen 80;
    server_name DOMAIN_PLACEHOLDER WWW_DOMAIN_PLACEHOLDER API_DOMAIN_PLACEHOLDER;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location /health {
        return 200 'ok';
        add_header Content-Type text/plain;
    }

    location / {
        return 200 'Waiting for SSL setup...';
        add_header Content-Type text/plain;
    }
}
SSLEOF

    sed -i "s|DOMAIN_PLACEHOLDER|${DOMAIN}|g" nginx/conf.d/temp-ssl.conf
    sed -i "s|WWW_DOMAIN_PLACEHOLDER|www.${DOMAIN}|g" nginx/conf.d/temp-ssl.conf
    sed -i "s|API_DOMAIN_PLACEHOLDER|${API_DOMAIN}|g" nginx/conf.d/temp-ssl.conf

    # Temporarily rename the main config
    if [ -f nginx/conf.d/talabin.conf ]; then
        mv nginx/conf.d/talabin.conf nginx/conf.d/talabin.conf.bak
    fi

    # Start only nginx and certbot
    docker compose -f "$COMPOSE_FILE" up -d nginx certbot 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" up -d nginx certbot

    sleep 5

    # Request certificate
    log_info "Requesting SSL certificate for ${DOMAIN}, www.${DOMAIN}, ${API_DOMAIN}..."

    docker compose -f "$COMPOSE_FILE" run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email "$ADMIN_EMAIL" \
        --agree-tos \
        --no-eff-email \
        -d "${DOMAIN}" \
        -d "www.${DOMAIN}" \
        -d "${API_DOMAIN}" 2>/dev/null || \
    docker-compose -f "$COMPOSE_FILE" run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email "$ADMIN_EMAIL" \
        --agree-tos \
        --no-eff-email \
        -d "${DOMAIN}" \
        -d "www.${DOMAIN}" \
        -d "${API_DOMAIN}"

    # Stop temporary nginx
    docker compose -f "$COMPOSE_FILE" down 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" down

    # Restore the real nginx config
    if [ -f nginx/conf.d/talabin.conf.bak ]; then
        mv nginx/conf.d/talabin.conf.bak nginx/conf.d/talabin.conf
    fi
    rm -f nginx/conf.d/temp-ssl.conf

    # Create symlinks from Let's Encrypt to nginx ssl directory
    log_info "Linking SSL certificates..."
    ln -sf /etc/letsencrypt/live/${DOMAIN}/fullchain.pem nginx/ssl/fullchain.pem 2>/dev/null || true
    ln -sf /etc/letsencrypt/live/${DOMAIN}/privkey.pem nginx/ssl/privkey.pem 2>/dev/null || true

    # Update nginx config to use Let's Encrypt certificate paths
    # The certbot_conf volume maps to /etc/letsencrypt inside nginx container
    sed -i "s|/etc/nginx/ssl/fullchain.pem|/etc/letsencrypt/live/${DOMAIN}/fullchain.pem|g" nginx/conf.d/talabin.conf
    sed -i "s|/etc/nginx/ssl/privkey.pem|/etc/letsencrypt/live/${DOMAIN}/privkey.pem|g" nginx/conf.d/talabin.conf

    log_success "SSL certificates obtained successfully!"
    log_info "Certificates will auto-renew via the certbot container."
}

# ===================== DEPLOY =====================

cmd_deploy() {
    check_root
    cd "$PROJECT_DIR"
    load_env

    TIMESTAMP=$(date +%Y%m%d_%H%M%S)

    log_info "============================================"
    log_info "  Deploying Talabin (${TIMESTAMP})"
    log_info "============================================"

    # ---------- Pre-flight checks ----------
    log_info "Running pre-flight checks..."

    if [ ! -f "backend/.env.production" ]; then
        log_error "backend/.env.production not found! Run './deploy.sh setup' first."
        exit 1
    fi

    if [ ! -f ".env" ]; then
        log_error "Root .env not found! Run './deploy.sh setup' first."
        exit 1
    fi

    # Check if SSL certs exist
    if ! grep -q "letsencrypt" nginx/conf.d/talabin.conf 2>/dev/null; then
        if [ ! -f "nginx/ssl/fullchain.pem" ] || [ ! -f "nginx/ssl/privkey.pem" ]; then
            log_warn "SSL certificates not found. Run './deploy.sh ssl' first,"
            log_warn "or place your certificates in nginx/ssl/ directory."
            if ! confirm "Continue without SSL? (nginx will fail on HTTPS)"; then
                exit 1
            fi
        fi
    fi

    log_success "Pre-flight checks passed"

    # ---------- Save current state for rollback ----------
    log_info "Saving current state for rollback..."
    CURRENT_COMMIT=$(git rev-parse HEAD 2>/dev/null || echo "none")
    echo "$CURRENT_COMMIT" > .last_deploy_commit
    log_success "Rollback point saved: ${CURRENT_COMMIT:0:8}"

    # ---------- Pull latest code ----------
    log_info "Pulling latest code from ${BRANCH}..."
    git fetch origin
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
    NEW_COMMIT=$(git rev-parse HEAD)
    log_success "Code updated to: ${NEW_COMMIT:0:8}"

    # ---------- Build images ----------
    log_info "Building Docker images..."
    docker compose -f "$COMPOSE_FILE" build --no-cache 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" build --no-cache
    log_success "Images built"

    # ---------- Stop current services (if running) ----------
    log_info "Stopping current services..."
    docker compose -f "$COMPOSE_FILE" down 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" down 2>/dev/null || true
    log_success "Services stopped"

    # ---------- Start services ----------
    log_info "Starting services..."
    docker compose -f "$COMPOSE_FILE" up -d 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" up -d
    log_success "Services started"

    # ---------- Wait for database to be ready ----------
    log_info "Waiting for database to be healthy..."
    for i in $(seq 1 30); do
        if docker compose -f "$COMPOSE_FILE" exec -T db pg_isready -U "${DB_USER:-talabin_user}" &>/dev/null 2>/dev/null || \
           docker-compose -f "$COMPOSE_FILE" exec -T db pg_isready -U "${DB_USER:-talabin_user}" &>/dev/null; then
            log_success "Database is ready"
            break
        fi
        if [ "$i" -eq 30 ]; then
            log_error "Database failed to start after 30 attempts"
            exit 1
        fi
        sleep 2
    done

    # ---------- Run migrations ----------
    log_info "Running database migrations..."
    docker compose -f "$COMPOSE_FILE" exec -T backend python manage.py migrate --noinput 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" exec -T backend python manage.py migrate --noinput
    log_success "Migrations complete"

    # ---------- Collect static files ----------
    log_info "Collecting static files..."
    docker compose -f "$COMPOSE_FILE" exec -T backend python manage.py collectstatic --noinput 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" exec -T backend python manage.py collectstatic --noinput
    log_success "Static files collected"

    # ---------- Health checks ----------
    log_info "Running health checks..."
    sleep 10

    HEALTHY=true

    # Check backend
    if docker compose -f "$COMPOSE_FILE" ps backend 2>/dev/null | grep -q "Up" || \
       docker-compose -f "$COMPOSE_FILE" ps backend 2>/dev/null | grep -q "Up"; then
        log_success "Backend: healthy"
    else
        log_error "Backend: unhealthy"
        HEALTHY=false
    fi

    # Check frontend
    if docker compose -f "$COMPOSE_FILE" ps frontend 2>/dev/null | grep -q "Up" || \
       docker-compose -f "$COMPOSE_FILE" ps frontend 2>/dev/null | grep -q "Up"; then
        log_success "Frontend: healthy"
    else
        log_error "Frontend: unhealthy"
        HEALTHY=false
    fi

    # Check nginx
    if docker compose -f "$COMPOSE_FILE" ps nginx 2>/dev/null | grep -q "Up" || \
       docker-compose -f "$COMPOSE_FILE" ps nginx 2>/dev/null | grep -q "Up"; then
        log_success "Nginx: healthy"
    else
        log_error "Nginx: unhealthy"
        HEALTHY=false
    fi

    if [ "$HEALTHY" = false ]; then
        log_error "Some services are unhealthy!"
        log_warn "Check logs with: ./deploy.sh logs"
        log_warn "Rollback with:  ./deploy.sh rollback"
        exit 1
    fi

    # ---------- Clean up old Docker images ----------
    log_info "Cleaning up unused Docker images..."
    docker image prune -f > /dev/null 2>&1
    log_success "Cleanup done"

    # ---------- Record deployment ----------
    echo "${TIMESTAMP} | ${NEW_COMMIT} | $(whoami)" >> .deploy_history

    echo ""
    log_success "============================================"
    log_success "  Deployment successful!"
    log_success "============================================"
    echo ""
    log_info "Application URLs:"
    echo "  Frontend:  https://${DOMAIN}"
    echo "  API:       https://${API_DOMAIN}"
    echo "  Admin:     https://${API_DOMAIN}/admin/"
    echo "  API Docs:  https://${API_DOMAIN}/api/docs/"
    echo ""
    log_info "Useful commands:"
    echo "  ./deploy.sh status   - Check service status"
    echo "  ./deploy.sh logs     - View logs"
    echo "  ./deploy.sh backup   - Backup database"
    echo ""
}

# ===================== BACKUP =====================

cmd_backup() {
    cd "$PROJECT_DIR"
    load_env

    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_DIR="backend/backups"
    BACKUP_FILE="${BACKUP_DIR}/talabin_backup_${TIMESTAMP}.sql.gz"

    mkdir -p "$BACKUP_DIR"

    log_info "Creating database backup..."

    # Extract DB credentials
    DB_USER_VAL=$(grep '^DB_USER=' backend/.env.production | cut -d= -f2)
    DB_NAME_VAL=$(grep '^DB_NAME=' backend/.env.production | cut -d= -f2)

    docker compose -f "$COMPOSE_FILE" exec -T db \
        pg_dump -U "${DB_USER_VAL:-talabin_user}" "${DB_NAME_VAL:-talabin_production}" | gzip > "$BACKUP_FILE" 2>/dev/null || \
    docker-compose -f "$COMPOSE_FILE" exec -T db \
        pg_dump -U "${DB_USER_VAL:-talabin_user}" "${DB_NAME_VAL:-talabin_production}" | gzip > "$BACKUP_FILE"

    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    log_success "Backup created: ${BACKUP_FILE} (${BACKUP_SIZE})"

    # Keep only last 30 backups
    ls -1t ${BACKUP_DIR}/talabin_backup_*.sql.gz 2>/dev/null | tail -n +31 | xargs -r rm
    log_info "Old backups cleaned (keeping last 30)"
}

# ===================== RESTORE =====================

cmd_restore() {
    cd "$PROJECT_DIR"
    load_env

    BACKUP_DIR="backend/backups"

    # List available backups
    log_info "Available backups:"
    ls -1t ${BACKUP_DIR}/talabin_backup_*.sql.gz 2>/dev/null | head -10 | nl

    echo ""
    read -r -p "Enter backup number to restore (or full path): " choice

    if [[ "$choice" =~ ^[0-9]+$ ]]; then
        BACKUP_FILE=$(ls -1t ${BACKUP_DIR}/talabin_backup_*.sql.gz 2>/dev/null | sed -n "${choice}p")
    else
        BACKUP_FILE="$choice"
    fi

    if [ ! -f "$BACKUP_FILE" ]; then
        log_error "Backup file not found: ${BACKUP_FILE}"
        exit 1
    fi

    log_warn "This will OVERWRITE the current database!"
    if ! confirm "Are you sure?"; then
        log_info "Restore cancelled"
        exit 0
    fi

    DB_USER_VAL=$(grep '^DB_USER=' backend/.env.production | cut -d= -f2)
    DB_NAME_VAL=$(grep '^DB_NAME=' backend/.env.production | cut -d= -f2)

    log_info "Restoring from: ${BACKUP_FILE}"

    # Drop and recreate database
    docker compose -f "$COMPOSE_FILE" exec -T db \
        psql -U "${DB_USER_VAL:-talabin_user}" -d postgres \
        -c "DROP DATABASE IF EXISTS ${DB_NAME_VAL:-talabin_production}; CREATE DATABASE ${DB_NAME_VAL:-talabin_production} OWNER ${DB_USER_VAL:-talabin_user};" 2>/dev/null || \
    docker-compose -f "$COMPOSE_FILE" exec -T db \
        psql -U "${DB_USER_VAL:-talabin_user}" -d postgres \
        -c "DROP DATABASE IF EXISTS ${DB_NAME_VAL:-talabin_production}; CREATE DATABASE ${DB_NAME_VAL:-talabin_production} OWNER ${DB_USER_VAL:-talabin_user};"

    # Restore
    gunzip -c "$BACKUP_FILE" | docker compose -f "$COMPOSE_FILE" exec -T db \
        psql -U "${DB_USER_VAL:-talabin_user}" "${DB_NAME_VAL:-talabin_production}" 2>/dev/null || \
    gunzip -c "$BACKUP_FILE" | docker-compose -f "$COMPOSE_FILE" exec -T db \
        psql -U "${DB_USER_VAL:-talabin_user}" "${DB_NAME_VAL:-talabin_production}"

    log_success "Database restored from: ${BACKUP_FILE}"

    # Run migrations in case the backup is from an older schema
    log_info "Running migrations..."
    docker compose -f "$COMPOSE_FILE" exec -T backend python manage.py migrate --noinput 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" exec -T backend python manage.py migrate --noinput
    log_success "Migrations applied"
}

# ===================== ROLLBACK =====================

cmd_rollback() {
    check_root
    cd "$PROJECT_DIR"
    load_env

    if [ ! -f ".last_deploy_commit" ]; then
        log_error "No rollback point found. Cannot rollback."
        exit 1
    fi

    ROLLBACK_COMMIT=$(cat .last_deploy_commit)

    if [ "$ROLLBACK_COMMIT" = "none" ]; then
        log_error "No previous deployment to rollback to."
        exit 1
    fi

    log_warn "Rolling back to commit: ${ROLLBACK_COMMIT:0:8}"
    if ! confirm "Are you sure?"; then
        exit 0
    fi

    # Backup current database before rollback
    log_info "Creating backup before rollback..."
    cmd_backup

    # Checkout the previous commit
    git checkout "$ROLLBACK_COMMIT"

    # Rebuild and restart
    log_info "Rebuilding with previous code..."
    docker compose -f "$COMPOSE_FILE" build 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" build

    docker compose -f "$COMPOSE_FILE" down 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" down

    docker compose -f "$COMPOSE_FILE" up -d 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" up -d

    # Run migrations
    sleep 10
    docker compose -f "$COMPOSE_FILE" exec -T backend python manage.py migrate --noinput 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" exec -T backend python manage.py migrate --noinput

    log_success "Rollback complete to: ${ROLLBACK_COMMIT:0:8}"
}

# ===================== LOGS =====================

cmd_logs() {
    cd "$PROJECT_DIR"
    load_env

    SERVICE="${1:-}"

    if [ -n "$SERVICE" ]; then
        docker compose -f "$COMPOSE_FILE" logs -f --tail=100 "$SERVICE" 2>/dev/null || \
            docker-compose -f "$COMPOSE_FILE" logs -f --tail=100 "$SERVICE"
    else
        docker compose -f "$COMPOSE_FILE" logs -f --tail=50 2>/dev/null || \
            docker-compose -f "$COMPOSE_FILE" logs -f --tail=50
    fi
}

# ===================== STATUS =====================

cmd_status() {
    cd "$PROJECT_DIR"
    load_env

    log_info "============================================"
    log_info "  Talabin Service Status"
    log_info "============================================"
    echo ""

    docker compose -f "$COMPOSE_FILE" ps 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" ps

    echo ""
    log_info "Disk usage:"
    docker system df 2>/dev/null || true

    echo ""
    log_info "Recent deployments:"
    tail -5 .deploy_history 2>/dev/null || echo "  No deployment history found"
}

# ===================== STOP =====================

cmd_stop() {
    cd "$PROJECT_DIR"
    load_env

    log_info "Stopping all services..."
    docker compose -f "$COMPOSE_FILE" down 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" down
    log_success "All services stopped"
}

# ===================== RESTART =====================

cmd_restart() {
    cd "$PROJECT_DIR"
    load_env

    SERVICE="${1:-}"

    if [ -n "$SERVICE" ]; then
        log_info "Restarting ${SERVICE}..."
        docker compose -f "$COMPOSE_FILE" restart "$SERVICE" 2>/dev/null || \
            docker-compose -f "$COMPOSE_FILE" restart "$SERVICE"
        log_success "${SERVICE} restarted"
    else
        log_info "Restarting all services..."
        docker compose -f "$COMPOSE_FILE" restart 2>/dev/null || \
            docker-compose -f "$COMPOSE_FILE" restart
        log_success "All services restarted"
    fi
}

# ===================== CREATE SUPERUSER =====================

cmd_createsuperuser() {
    cd "$PROJECT_DIR"
    load_env

    log_info "Creating Django superuser..."
    docker compose -f "$COMPOSE_FILE" exec backend python manage.py createsuperuser 2>/dev/null || \
        docker-compose -f "$COMPOSE_FILE" exec backend python manage.py createsuperuser
}

# ===================== MAIN =====================

main() {
    # Load deploy env if exists
    if [ -f "$PROJECT_DIR/.deploy.env" ]; then
        cd "$PROJECT_DIR"
        load_env
    fi

    COMMAND="${1:-help}"
    EXTRA="${2:-}"

    case "$COMMAND" in
        setup)
            cmd_setup
            ;;
        deploy)
            cmd_deploy
            ;;
        ssl)
            cmd_ssl
            ;;
        backup)
            cmd_backup
            ;;
        restore)
            cmd_restore
            ;;
        rollback)
            cmd_rollback
            ;;
        logs)
            cmd_logs "$EXTRA"
            ;;
        status)
            cmd_status
            ;;
        stop)
            cmd_stop
            ;;
        restart)
            cmd_restart "$EXTRA"
            ;;
        createsuperuser)
            cmd_createsuperuser
            ;;
        *)
            echo ""
            echo "Talabin Deployment Script"
            echo "========================="
            echo ""
            echo "Usage: $0 <command> [options]"
            echo ""
            echo "Commands:"
            echo "  setup            First-time server setup"
            echo "  deploy           Deploy or update the application"
            echo "  ssl              Obtain/renew SSL certificates"
            echo "  backup           Backup database"
            echo "  restore          Restore database from backup"
            echo "  rollback         Rollback to previous deployment"
            echo "  logs [service]   Tail logs (all or specific service)"
            echo "  status           Show service status"
            echo "  stop             Stop all services"
            echo "  restart [svc]    Restart all or specific service"
            echo "  createsuperuser  Create Django admin user"
            echo ""
            echo "Examples:"
            echo "  $0 setup                    # First-time setup"
            echo "  $0 deploy                   # Deploy latest code"
            echo "  $0 logs backend             # View backend logs"
            echo "  $0 restart nginx            # Restart nginx only"
            echo ""
            echo "Configuration:"
            echo "  Create a .deploy.env file to override defaults:"
            echo "    DOMAIN=talabin.ir"
            echo "    API_DOMAIN=api.talabin.ir"
            echo "    REPO_URL=git@github.com:your-org/talabin-client.git"
            echo "    BRANCH=main"
            echo ""
            ;;
    esac
}

main "$@"
