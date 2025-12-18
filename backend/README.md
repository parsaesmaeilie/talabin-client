# Talabin Backend API

A comprehensive Django REST Framework backend for the Talabin digital gold trading platform.

## Features

- **User Authentication**: JWT-based authentication with OTP verification
- **Wallet Management**: Multi-currency wallet (IRR and Gold) with freeze/unfreeze capabilities
- **Trading**: Buy and sell gold with real-time pricing
- **Transactions**: Complete transaction history and analytics
- **Deposits & Withdrawals**: Bank account integration for deposits and withdrawals
- **Installment Plans**: Flexible installment payment options
- **Price Management**: Real-time gold price updates with historical data
- **Admin Panel**: Comprehensive Django admin interface

## Tech Stack

- **Framework**: Django 5.0 + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (Simple JWT)
- **Caching**: Redis
- **Task Queue**: Celery
- **API Documentation**: drf-spectacular (OpenAPI/Swagger)

## Project Structure

```
backend/
├── apps/
│   ├── accounts/          # User authentication and profiles
│   ├── wallet/            # Wallet and balance management
│   ├── trading/           # Buy/sell gold operations
│   ├── transactions/      # Transaction history
│   ├── prices/            # Gold price management
│   ├── installments/      # Installment payment plans
│   └── core/              # Shared utilities and base models
├── config/                # Django settings and configuration
├── manage.py
├── requirements.txt
└── README.md
```

## Installation

### Prerequisites

- Python 3.10 or higher
- PostgreSQL 12 or higher
- Redis (for Celery)

### Step 1: Clone the repository

```bash
cd backend
```

### Step 2: Create virtual environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Set up environment variables

Copy the `.env.example` file to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
DB_ENGINE=django.db.backends.postgresql
DB_NAME=talabin_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Step 5: Set up PostgreSQL database

```bash
# Create database
psql -U postgres
CREATE DATABASE talabin_db;
\q
```

### Step 6: Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 7: Create superuser

```bash
python manage.py createsuperuser
```

### Step 8: Run the development server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

### Step 9: Access the admin panel

Navigate to `http://localhost:8000/admin` and login with your superuser credentials.

### Step 10: View API documentation

Navigate to `http://localhost:8000/api/docs/` for Swagger UI documentation.

## API Endpoints

### Authentication

- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `POST /api/auth/send-otp/` - Send OTP code
- `POST /api/auth/verify-otp/` - Verify OTP code
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/me/` - Get current user profile
- `PUT /api/auth/profile/update/` - Update user profile
- `POST /api/auth/profile/change-password/` - Change password
- `POST /api/auth/profile/verification/` - Submit verification documents

### Wallet

- `GET /api/wallet/balance/` - Get wallet balance
- `GET /api/wallet/transactions/` - Get transaction history
- `GET /api/wallet/bank-accounts/` - List bank accounts
- `POST /api/wallet/bank-accounts/` - Add bank account
- `POST /api/wallet/deposits/create_deposit/` - Create deposit request
- `POST /api/wallet/deposits/{id}/upload_receipt/` - Upload deposit receipt
- `POST /api/wallet/withdrawals/create_withdrawal/` - Create withdrawal request
- `POST /api/wallet/withdrawals/{id}/cancel/` - Cancel withdrawal

### Trading

- `POST /api/trading/orders/preview/` - Preview order
- `POST /api/trading/orders/place_order/` - Place buy/sell order
- `GET /api/trading/orders/` - List user orders
- `POST /api/trading/orders/{id}/cancel/` - Cancel order

### Prices

- `GET /api/prices/gold/current/` - Get current gold price
- `GET /api/prices/gold/history/?timeframe=24h` - Get price history

### Transactions

- `GET /api/transactions/` - List all transactions
- `GET /api/transactions/summary/` - Get transaction statistics

### Installments

- `GET /api/installments/plans/` - List installment plans
- `POST /api/installments/subscriptions/subscribe/` - Subscribe to plan
- `GET /api/installments/subscriptions/` - List user installments
- `POST /api/installments/subscriptions/{id}/pay/` - Pay installment

## Running with Celery

For background tasks (price updates, notifications, etc.):

### Start Redis

```bash
# Make sure Redis is running
redis-server
```

### Start Celery worker

```bash
celery -A config worker -l info
```

### Start Celery beat (for periodic tasks)

```bash
celery -A config beat -l info
```

## Testing

Create test data for development:

```bash
python manage.py shell
```

```python
from apps.accounts.models import User
from apps.wallet.models import Wallet
from apps.prices.models import GoldPrice

# Create a test user
user = User.objects.create_user(
    phone_number='+989123456789',
    password='testpass123'
)

# Create wallet
wallet = Wallet.objects.create(user=user)
wallet.add_balance(amount_irr=1000000)

# Create gold price
GoldPrice.objects.create(
    buy_price=2950000,
    sell_price=3050000,
    is_active=True
)
```

## Production Deployment

### Security Checklist

1. Set `DEBUG=False`
2. Update `SECRET_KEY` with a strong random key
3. Configure `ALLOWED_HOSTS`
4. Set up HTTPS
5. Configure proper CORS settings
6. Set up database backups
7. Configure logging
8. Set up monitoring (e.g., Sentry)

### Collect static files

```bash
python manage.py collectstatic
```

### Use production WSGI server

```bash
pip install gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | Required |
| `DEBUG` | Debug mode | `False` |
| `ALLOWED_HOSTS` | Allowed hosts | `localhost` |
| `DB_ENGINE` | Database engine | `postgresql` |
| `DB_NAME` | Database name | `talabin_db` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | Required |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `CORS_ALLOWED_ORIGINS` | CORS allowed origins | Required |
| `JWT_ACCESS_TOKEN_LIFETIME` | JWT access token lifetime (minutes) | `60` |
| `JWT_REFRESH_TOKEN_LIFETIME` | JWT refresh token lifetime (days) | `7` |
| `TRANSACTION_FEE_PERCENTAGE` | Transaction fee percentage | `0.5` |
| `MIN_PURCHASE_AMOUNT` | Minimum purchase amount | `100000` |
| `MIN_WITHDRAWAL_AMOUNT` | Minimum withdrawal amount | `50000` |

## API Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "message": "عملیات با موفقیت انجام شد",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "خطا در انجام عملیات",
    "details": {
      // Error details
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential.

## Support

For support, please contact the development team.
