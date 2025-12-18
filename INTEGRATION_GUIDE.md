# Talabin - Frontend & Backend Integration Guide

## 🎉 Integration Status: COMPLETE ✅

Both frontend (Next.js) and backend (Django) are now fully integrated and running!

---

## 🌐 Server Status

### Backend (Django REST API)
- **URL**: http://localhost:8000
- **API Base**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin
- **API Docs**: http://localhost:8000/api/docs
- **Status**: ✅ Running

### Frontend (Next.js)
- **URL**: http://localhost:3000
- **Test Page**: http://localhost:3000/test-integration
- **Status**: ✅ Running

---

## 🧪 Test Integration Page

Visit: **http://localhost:3000/test-integration**

This page demonstrates:
1. **Public API Call** - Fetches current gold price (no authentication required)
2. **Authentication** - Login with test credentials
3. **Authenticated API Call** - Fetches wallet balance after login

### Test Credentials
- **Phone**: +989121234567
- **Password**: test123
- **Balance**: 5,000,000 Toman + 1.5g Gold

---

## 📁 Integration Files

### Environment Configuration
```
.env.local
```
- `NEXT_PUBLIC_API_URL=http://localhost:8000/api`

### API Client
```
lib/api/client.ts
```
- Base API client with fetch wrapper
- Token management (localStorage)
- Error handling
- File upload support

### API Services
```
lib/api/auth.ts        # Authentication & user management
lib/api/wallet.ts      # Wallet & banking operations
lib/api/trading.ts     # Gold trading (buy/sell)
lib/api/prices.ts      # Gold price data
lib/api/index.ts       # Central exports
```

---

## 🔌 API Integration Examples

### 1. Get Current Gold Price (Public)
```typescript
import { pricesService } from '@/lib/api';

const response = await pricesService.getCurrentPrice();
if (response.success) {
  console.log('Buy:', response.data.buy_price);
  console.log('Sell:', response.data.sell_price);
}
```

### 2. User Login
```typescript
import { authService } from '@/lib/api';

const response = await authService.login({
  phone_number: '+989121234567',
  password: 'test123'
});

if (response.success) {
  // Token is automatically stored
  const user = response.data.user;
  const tokens = response.data.tokens;
}
```

### 3. Get Wallet Balance (Authenticated)
```typescript
import { walletService } from '@/lib/api';

const response = await walletService.getBalance();
if (response.success) {
  console.log('IRR Balance:', response.data.balance_irr);
  console.log('Gold Balance:', response.data.gold_balance);
}
```

### 4. Place Buy Order (Authenticated)
```typescript
import { tradingService } from '@/lib/api';

// Preview order first
const preview = await tradingService.previewOrder({
  order_type: 'buy',
  amount_irr: 1000000  // 1 million Toman
});

// Place actual order
const order = await tradingService.placeOrder({
  order_type: 'buy',
  amount_irr: 1000000
});
```

---

## 🔐 Authentication Flow

1. **Login** → Receives access token and refresh token
2. **Token Storage** → Automatically stored in localStorage
3. **API Calls** → Access token automatically added to Authorization header
4. **Token Refresh** → Manual refresh using refresh token (implement as needed)
5. **Logout** → Tokens cleared from storage

---

## 📊 Available API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `POST /api/auth/send-otp/` - Send OTP code
- `POST /api/auth/verify-otp/` - Verify OTP code
- `GET /api/auth/me/` - Get current user
- `PUT /api/auth/profile/update/` - Update profile
- `POST /api/auth/profile/change-password/` - Change password

### Wallet
- `GET /api/wallet/balance/` - Get wallet balance
- `GET /api/wallet/transactions/` - Get transaction history
- `GET /api/wallet/bank-accounts/` - List bank accounts
- `POST /api/wallet/bank-accounts/` - Add bank account
- `POST /api/wallet/deposits/create_deposit/` - Create deposit
- `POST /api/wallet/withdrawals/create_withdrawal/` - Create withdrawal

### Trading
- `POST /api/trading/orders/preview/` - Preview order
- `POST /api/trading/orders/place_order/` - Place order
- `GET /api/trading/orders/` - List orders
- `POST /api/trading/orders/{id}/cancel/` - Cancel order

### Prices
- `GET /api/prices/gold/current/` - Current gold price
- `GET /api/prices/gold/history/?timeframe=24h` - Price history

---

## 🔧 Backend CORS Configuration

The backend is already configured to accept requests from the frontend:

```python
# backend/config/settings.py
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]
CORS_ALLOW_CREDENTIALS = True
```

---

## 🚀 Running Both Servers

### Terminal 1 - Backend (Django)
```bash
cd backend
venv\Scripts\activate      # Windows
source venv/bin/activate   # Linux/Mac
python manage.py runserver
```

### Terminal 2 - Frontend (Next.js)
```bash
npm run dev
```

Both servers are currently running in the background!

---

## 📝 API Response Format

All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "message": "عملیات با موفقیت انجام شد",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "خطا در انجام عملیات",
    "details": {}
  }
}
```

---

## 🧩 TypeScript Types

All API responses and data structures are fully typed:

```typescript
// User type
interface User {
  id: number;
  phone_number: string;
  email: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  // ... more fields
}

// Wallet type
interface Wallet {
  id: number;
  balance_irr: string;
  gold_balance: string;
  available_balance_irr: string;
  available_gold_balance: string;
  // ... more fields
}

// And many more...
```

---

## 🎨 Frontend Integration Points

### Where to Use API Services

1. **Pages/Components**: Import and use services directly
   ```typescript
   import { authService, walletService } from '@/lib/api';
   ```

2. **Client Components**: Use `'use client'` directive
   ```typescript
   'use client';
   import { useEffect, useState } from 'react';
   import { pricesService } from '@/lib/api';
   ```

3. **Server Components**: Can't use localStorage, use cookies/session instead

---

## 🔍 Debugging

### Check Backend Logs
```bash
# Backend terminal
# Look for API requests and errors
```

### Check Browser Console
```javascript
// Network tab - see all API calls
// Console - see any JavaScript errors
```

### Check Backend Server Log
```bash
cat backend/server.log
```

---

## 🎯 Next Steps

### For Development
1. ✅ Both servers are running
2. ✅ Test page is working
3. ✅ API integration is complete
4. 🔄 Start building actual pages using the API

### For Production
1. Update CORS settings for production domain
2. Set `DEBUG=False` in Django
3. Use PostgreSQL instead of SQLite
4. Set up proper environment variables
5. Deploy backend and frontend separately

---

## 📚 Additional Resources

### Backend Documentation
- **README**: `backend/README.md`
- **API Guide**: `backend/API_GUIDE.md`
- **Quick Start**: `backend/QUICKSTART.md`
- **Deployment**: `backend/DEPLOYMENT.md`
- **Status**: `backend/BACKEND_STATUS.md`

### API Documentation
- **Swagger UI**: http://localhost:8000/api/docs/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

### Admin Panel
- **URL**: http://localhost:8000/admin/
- **Username**: +989123456789
- **Password**: admin123

---

## ✅ Integration Checklist

- [x] Backend server running on port 8000
- [x] Frontend server running on port 3000
- [x] CORS configured correctly
- [x] API client created with TypeScript types
- [x] Authentication service implemented
- [x] Wallet service implemented
- [x] Trading service implemented
- [x] Prices service implemented
- [x] Test page created and working
- [x] Public API calls working (gold prices)
- [x] Authenticated API calls working (wallet balance)
- [x] Token management working
- [x] Error handling implemented

---

## 🎉 You're All Set!

The integration is complete and ready for development. Visit:

**http://localhost:3000/test-integration**

to see it in action!
