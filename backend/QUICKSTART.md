# Talabin Backend - Quick Start Guide

## Overview

The Talabin backend is a comprehensive Django REST Framework API for a digital gold trading platform. All core features have been implemented and are ready for use.

## Prerequisites

- Python 3.10 or higher
- pip (Python package manager)
- SQLite (for development, included with Python) or PostgreSQL (for production)

## Quick Setup (Development)

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Create and Activate Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

If you encounter network issues, try:
```bash
pip install -r requirements.txt --timeout=100 --retries=5
```

### 4. Environment Configuration

The `.env` file is already configured for development with SQLite. No changes needed for quick testing.

### 5. Run Migrations

```bash
python manage.py migrate
```

### 6. Create Test Data

```bash
python create_test_data.py
```

This will create:
- **Admin User**: +989123456789 / admin123
- **Test User**: +989121234567 / test123 (with 5M Toman + 1.5g gold)
- **Gold Prices**: Buy 2,950,000 / Sell 3,050,000 Toman per gram
- **Price History**: 24 hours of sample data
- **Installment Plans**: 3, 6, and 12-month plans

### 7. Run Development Server

```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000`

## Access Points

- **API Root**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/
- **API Documentation**: http://localhost:8000/api/docs/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

## Testing the API

### 1. Login to Get Token

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "+989121234567",
    "password": "test123"
  }'
```

### 2. Use Token for Authenticated Requests

```bash
curl -X GET http://localhost:8000/api/wallet/balance/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. Get Current Gold Price

```bash
curl -X GET http://localhost:8000/api/prices/gold/current/
```

### 4. Place a Buy Order

```bash
curl -X POST http://localhost:8000/api/trading/orders/place_order/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "order_type": "buy",
    "amount_irr": 1000000
  }'
```

## Available Features

### Authentication & User Management
✅ User registration with phone number
✅ Login with JWT tokens
✅ OTP verification (console output in dev mode)
✅ Profile management
✅ Password change
✅ Identity verification submission
✅ User addresses management

### Wallet Management
✅ Multi-currency wallet (IRR + Gold)
✅ Balance tracking with freeze/unfreeze
✅ Transaction history
✅ Bank account management
✅ Deposit requests with receipt upload
✅ Withdrawal requests with approval workflow

### Trading
✅ Real-time gold price retrieval
✅ Order preview (calculate totals before execution)
✅ Buy/Sell gold orders
✅ Order history
✅ Order cancellation
✅ Automatic balance updates

### Prices
✅ Current gold price endpoint
✅ Historical price data
✅ Multiple timeframes (1h, 24h, 7d, 30d)
✅ Admin price management

### Transactions
✅ Unified transaction history
✅ Transaction filtering by type/status
✅ Transaction statistics and summaries

### Installments
✅ Installment plan templates
✅ Plan subscription
✅ Monthly payment scheduling
✅ Payment processing from wallet
✅ Overdue payment tracking

### Admin Features
✅ Comprehensive admin panel
✅ User management with verification
✅ Deposit approval workflow
✅ Withdrawal approval workflow
✅ Gold price management
✅ Transaction monitoring
✅ Installment plan management

## API Response Format

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

## Common Commands

### Create Superuser
```bash
python manage.py createsuperuser
```

### Make Migrations (after model changes)
```bash
python manage.py makemigrations
python manage.py migrate
```

### Run Tests
```bash
python manage.py test
```

### Collect Static Files (for production)
```bash
python manage.py collectstatic
```

## Project Structure

```
backend/
├── apps/
│   ├── accounts/         # User authentication and profiles
│   ├── wallet/           # Wallet and balance management
│   ├── trading/          # Buy/sell gold operations
│   ├── transactions/     # Transaction history
│   ├── prices/           # Gold price management
│   ├── installments/     # Installment payment plans
│   └── core/             # Shared utilities and base models
├── config/               # Django settings and configuration
├── static/               # Static files
├── media/                # User uploads
├── venv/                 # Virtual environment (after setup)
├── db.sqlite3            # SQLite database (after migrations)
├── manage.py             # Django management script
├── requirements.txt      # Python dependencies
├── create_test_data.py   # Test data creation script
└── .env                  # Environment variables
```

## Environment Variables

Key variables in `.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG` | Debug mode | `True` |
| `SECRET_KEY` | Django secret key | Auto-generated |
| `DB_ENGINE` | Database engine | `sqlite3` |
| `CORS_ALLOWED_ORIGINS` | CORS origins | `localhost:3000` |
| `TRANSACTION_FEE_PERCENTAGE` | Transaction fee % | `0.5` |
| `MIN_PURCHASE_AMOUNT` | Min purchase (IRR) | `100000` |
| `MIN_WITHDRAWAL_AMOUNT` | Min withdrawal (IRR) | `50000` |

## Next Steps

1. **For Development**:
   - The backend is ready to use with SQLite
   - Test all endpoints using the API documentation
   - Modify features as needed

2. **For Production**:
   - Set up PostgreSQL database
   - Configure Redis for Celery
   - Set `DEBUG=False` in .env
   - Update `SECRET_KEY` with a strong random key
   - Configure CORS for your frontend domain
   - Set up SSL/HTTPS
   - Use Gunicorn or uWSGI as WSGI server
   - See `DEPLOYMENT.md` for detailed production setup

3. **Integration with Frontend**:
   - Frontend should use: http://localhost:8000/api/
   - Include JWT token in Authorization header
   - Handle Persian (Farsi) messages
   - Display prices in Toman currency
   - Format gold amounts to 4 decimal places

## Troubleshooting

### Port Already in Use
```bash
python manage.py runserver 8001
```

### Migration Issues
```bash
python manage.py migrate --run-syncdb
```

### Clear Database and Start Fresh
```bash
# Delete db.sqlite3
del db.sqlite3  # Windows
rm db.sqlite3   # Linux/Mac

# Recreate database
python manage.py migrate
python create_test_data.py
```

## Support

For issues or questions:
1. Check the API documentation at `/api/docs/`
2. Review `README.md` for detailed information
3. Check `API_GUIDE.md` for endpoint details
4. Review `DEPLOYMENT.md` for production setup

## Status

✅ **Backend is 100% Complete and Ready to Use**

All core features are implemented:
- Authentication ✅
- Wallet Management ✅
- Trading ✅
- Prices ✅
- Transactions ✅
- Installments ✅
- Admin Panel ✅

No critical TODOs remain. Optional enhancements:
- SMS integration for OTP (currently logs to console)
- Payment gateway integration (placeholder ready)
- Celery for background tasks (optional for basic usage)
