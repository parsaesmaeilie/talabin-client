# Talabin - Digital Gold Trading Platform

A comprehensive full-stack digital gold trading platform with real-time pricing, wallet management, trading, and installment payment features.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup (Django)](#backend-setup-django)
  - [Frontend Setup (Next.js)](#frontend-setup-nextjs)
- [Running the Application](#running-the-application)
- [Test Accounts](#test-accounts)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Environment Variables](#environment-variables)

## Overview

Talabin is a digital gold trading platform that allows users to buy and sell gold using Iranian Rials (Toman). The platform features:
- User authentication with phone number and OTP
- Multi-currency wallet (IRR + Gold)
- Real-time gold pricing
- Buy/Sell gold operations
- Installment payment plans
- Transaction history and analytics
- Admin panel for management

## Features

### User Features
- Phone number authentication with OTP verification
- Profile and identity verification
- Multi-currency wallet (Toman + Gold)
- Deposit and withdrawal requests
- Real-time gold price tracking
- Buy and sell gold instantly
- Installment payment plans
- Transaction history
- Price charts and analytics

### Admin Features
- User management and verification
- Deposit/Withdrawal approval workflow
- Gold price management
- Transaction monitoring
- Installment plan management
- Comprehensive admin panel

## Tech Stack

**Frontend:**
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS 4
- Chart.js for data visualization
- React Hook Form for form handling
- Zustand for state management

**Backend:**
- Django 5.1
- Django REST Framework
- JWT Authentication
- SQLite (development) / PostgreSQL (production)
- Python 3.10+

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Python** (3.10 or higher)
- **pip** (Python package manager)
- **Git**

## Installation

### Backend Setup (Django)

#### 1. Navigate to Backend Directory

```bash
cd backend
```

#### 2. Create Virtual Environment

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

#### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

If you encounter network issues, try:
```bash
pip install -r requirements.txt --timeout=100 --retries=5
```

#### 4. Run Database Migrations

```bash
python manage.py migrate
```

#### 5. Create Test Data

```bash
python create_test_data.py
```

This creates:
- Admin user: +989123456789 / admin123
- Test user: +989121234567 / test123 (with 5M Toman + 1.5g gold)
- Gold prices and sample data
- Installment plans

#### 6. Return to Root Directory

```bash
cd ..
```

### Frontend Setup (Next.js)

#### 1. Install Node Dependencies

From the root directory:

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

#### 2. Environment Configuration

The frontend is pre-configured to connect to `http://localhost:8000/api/` for the backend.

## Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend (Django):**
```bash
cd backend
venv\Scripts\activate          # Windows
# or
source venv/bin/activate       # Linux/Mac

python manage.py runserver
```

**Terminal 2 - Frontend (Next.js):**
```bash
npm run dev
```

### Option 2: Quick Start Script (Windows)

You can also use the setup script:
```bash
cd backend
setup.bat
```

Then in another terminal:
```bash
npm run dev
```

### Access the Application

Once both servers are running:

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/
- **API Documentation**: http://localhost:8000/api/docs/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

## Test Accounts

### Admin User
- Phone: +989123456789
- Password: admin123
- Access to admin panel

### Regular User
- Phone: +989121234567
- Password: test123
- Pre-loaded with 5,000,000 Toman and 1.5g gold

## Project Structure

```
talabin-client/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication pages
│   ├── dashboard/           # Dashboard and main app pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── backend/                  # Django backend
│   ├── apps/                # Django applications
│   │   ├── accounts/        # User authentication
│   │   ├── wallet/          # Wallet management
│   │   ├── trading/         # Trading operations
│   │   ├── transactions/    # Transaction history
│   │   ├── prices/          # Price management
│   │   └── installments/    # Installment plans
│   ├── config/              # Django settings
│   ├── manage.py            # Django CLI
│   ├── requirements.txt     # Python dependencies
│   └── create_test_data.py  # Test data script
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   └── dashboard/           # Dashboard-specific components
├── lib/                     # Utility functions
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
├── package.json             # Node.js dependencies
└── README.md               # This file
```

## API Documentation

### Key Endpoints

**Authentication:**
- POST `/api/auth/register/` - Register new user
- POST `/api/auth/login/` - Login and get JWT token
- POST `/api/auth/verify-otp/` - Verify OTP code
- GET `/api/auth/profile/` - Get user profile
- PUT `/api/auth/profile/` - Update profile

**Wallet:**
- GET `/api/wallet/balance/` - Get wallet balance
- GET `/api/wallet/transactions/` - Transaction history
- POST `/api/wallet/deposit/` - Create deposit request
- POST `/api/wallet/withdraw/` - Create withdrawal request

**Trading:**
- GET `/api/prices/gold/current/` - Get current gold price
- POST `/api/trading/orders/place_order/` - Place buy/sell order
- GET `/api/trading/orders/` - Order history
- GET `/api/trading/orders/{id}/` - Order details

**Prices:**
- GET `/api/prices/gold/current/` - Current gold price
- GET `/api/prices/gold/history/` - Historical prices

**Installments:**
- GET `/api/installments/plans/` - Available plans
- POST `/api/installments/subscriptions/` - Subscribe to plan
- GET `/api/installments/subscriptions/` - User's subscriptions

Full API documentation available at: http://localhost:8000/api/docs/

## Troubleshooting

### Port Already in Use

**Backend (port 8000):**
```bash
python manage.py runserver 8001
```

**Frontend (port 3000):**
The Next.js dev server will automatically use port 3001 if 3000 is occupied.

### Database Issues

Reset the database:
```bash
cd backend
# Windows
del db.sqlite3
# Linux/Mac
rm db.sqlite3

# Recreate
python manage.py migrate
python create_test_data.py
```

### Python Virtual Environment Not Activating

**Windows:**
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Linux/Mac:**
Ensure the activate script has execute permissions:
```bash
chmod +x venv/bin/activate
```

### Frontend Build Errors

Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### CORS Errors

Ensure the Django backend CORS settings in `backend/config/settings.py` include:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

## Environment Variables

### Backend (backend/.env)

```env
DEBUG=True
SECRET_KEY=your-secret-key
DB_ENGINE=sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
TRANSACTION_FEE_PERCENTAGE=0.5
MIN_PURCHASE_AMOUNT=100000
MIN_WITHDRAWAL_AMOUNT=50000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Development Workflow

1. **Start Backend Server** (Terminal 1)
   ```bash
   cd backend
   venv\Scripts\activate  # or source venv/bin/activate
   python manage.py runserver
   ```

2. **Start Frontend Server** (Terminal 2)
   ```bash
   npm run dev
   ```

3. **Access Application**
   - Open http://localhost:3000
   - Login with test account: +989121234567 / test123

4. **View API Docs**
   - Open http://localhost:8000/api/docs/

## Additional Commands

### Backend

**Create superuser:**
```bash
python manage.py createsuperuser
```

**Run tests:**
```bash
python manage.py test
```

**Make migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

### Frontend

**Build for production:**
```bash
npm run build
npm start
```

**Run linter:**
```bash
npm run lint
```

## Production Deployment

For production deployment:

1. Set `DEBUG=False` in backend/.env
2. Configure PostgreSQL database
3. Set up Redis for caching
4. Use Gunicorn/uWSGI for Django
5. Configure Nginx reverse proxy
6. Set up SSL certificates
7. Configure proper CORS origins
8. See `backend/DEPLOYMENT.md` for details

## Support

For detailed documentation:
- Backend API Guide: `backend/API_GUIDE.md`
- Backend Quick Start: `backend/QUICKSTART.md`
- Deployment Guide: `backend/DEPLOYMENT.md`
- Integration Guide: `INTEGRATION_GUIDE.md`

## License

This project is private and proprietary.

## Status

Backend: 100% Complete
Frontend: Integration Complete

All core features implemented and ready for use.
