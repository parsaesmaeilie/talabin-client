# Talabin API Integration Guide

This guide will help you integrate the Talabin backend API with your frontend application.

## Authentication Flow

### 1. User Registration

```javascript
// POST /api/auth/register/
const register = async (phoneNumber, password) => {
  const response = await fetch('http://localhost:8000/api/auth/register/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone_number: phoneNumber,
      password: password,
      password_confirm: password
    })
  });

  const data = await response.json();
  // OTP code will be sent to phone
  return data;
};
```

### 2. Verify OTP

```javascript
// POST /api/auth/verify-otp/
const verifyOTP = async (phoneNumber, code) => {
  const response = await fetch('http://localhost:8000/api/auth/verify-otp/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone_number: phoneNumber,
      code: code,
      otp_type: 'registration'
    })
  });

  return await response.json();
};
```

### 3. Login

```javascript
// POST /api/auth/login/
const login = async (phoneNumber, password) => {
  const response = await fetch('http://localhost:8000/api/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone_number: phoneNumber,
      password: password
    })
  });

  const data = await response.json();

  if (data.success) {
    // Store tokens
    localStorage.setItem('access_token', data.data.tokens.access);
    localStorage.setItem('refresh_token', data.data.tokens.refresh);
  }

  return data;
};
```

### 4. Making Authenticated Requests

```javascript
const makeAuthRequest = async (url, options = {}) => {
  const token = localStorage.getItem('access_token');

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  // Handle token refresh if needed
  if (response.status === 401) {
    // Refresh token logic here
    const newToken = await refreshToken();
    // Retry request with new token
  }

  return await response.json();
};
```

### 5. Refresh Token

```javascript
// POST /api/auth/token/refresh/
const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');

  const response = await fetch('http://localhost:8000/api/auth/token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  });

  const data = await response.json();
  localStorage.setItem('access_token', data.access);

  return data.access;
};
```

## Wallet Operations

### Get Wallet Balance

```javascript
// GET /api/wallet/balance/
const getWalletBalance = async () => {
  return await makeAuthRequest('http://localhost:8000/api/wallet/balance/');
};

// Response:
// {
//   "success": true,
//   "data": {
//     "balance_irr": "1000000.00",
//     "gold_balance": "2.5000",
//     "available_balance_irr": "950000.00",
//     "available_gold_balance": "2.5000"
//   }
// }
```

### Get Transaction History

```javascript
// GET /api/wallet/transactions/
const getTransactions = async (type = null) => {
  const url = type
    ? `http://localhost:8000/api/wallet/transactions/?type=${type}`
    : 'http://localhost:8000/api/wallet/transactions/';

  return await makeAuthRequest(url);
};
```

### Create Deposit Request

```javascript
// POST /api/wallet/deposits/create_deposit/
const createDeposit = async (amount, paymentMethod) => {
  return await makeAuthRequest('http://localhost:8000/api/wallet/deposits/create_deposit/', {
    method: 'POST',
    body: JSON.stringify({
      amount: amount,
      payment_method: paymentMethod // 'online' or 'bank_transfer'
    })
  });
};
```

### Create Withdrawal Request

```javascript
// POST /api/wallet/withdrawals/create_withdrawal/
const createWithdrawal = async (bankAccountId, amount) => {
  return await makeAuthRequest('http://localhost:8000/api/wallet/withdrawals/create_withdrawal/', {
    method: 'POST',
    body: JSON.stringify({
      bank_account_id: bankAccountId,
      amount: amount
    })
  });
};
```

## Trading Operations

### Preview Order

```javascript
// POST /api/trading/orders/preview/
const previewOrder = async (orderType, amountIRR) => {
  return await makeAuthRequest('http://localhost:8000/api/trading/orders/preview/', {
    method: 'POST',
    body: JSON.stringify({
      order_type: orderType, // 'buy' or 'sell'
      amount_irr: amountIRR
    })
  });
};

// Response:
// {
//   "success": true,
//   "data": {
//     "order_type": "buy",
//     "amount_irr": "500000.00",
//     "gold_price_per_gram": "3000000.00",
//     "gold_amount": "0.1667",
//     "fee": "2500.00",
//     "total_amount": "502500.00"
//   }
// }
```

### Place Order

```javascript
// POST /api/trading/orders/place_order/
const placeOrder = async (orderType, amountIRR) => {
  return await makeAuthRequest('http://localhost:8000/api/trading/orders/place_order/', {
    method: 'POST',
    body: JSON.stringify({
      order_type: orderType,
      amount_irr: amountIRR
    })
  });
};
```

## Price Management

### Get Current Gold Price

```javascript
// GET /api/prices/gold/current/
const getCurrentPrice = async () => {
  // This endpoint doesn't require authentication
  const response = await fetch('http://localhost:8000/api/prices/gold/current/');
  return await response.json();
};

// Response:
// {
//   "success": true,
//   "data": {
//     "buy_price": "2950000.00",
//     "sell_price": "3050000.00",
//     "spread": "100000.00",
//     "is_active": true,
//     "created_at": "2024-01-15T10:30:00Z"
//   }
// }
```

### Get Price History

```javascript
// GET /api/prices/gold/history/?timeframe=24h
const getPriceHistory = async (timeframe = '24h') => {
  const response = await fetch(
    `http://localhost:8000/api/prices/gold/history/?timeframe=${timeframe}`
  );
  return await response.json();
};

// Timeframe options: '1h', '24h', '7d', '30d'
```

## User Profile

### Get Current User

```javascript
// GET /api/auth/me/
const getCurrentUser = async () => {
  return await makeAuthRequest('http://localhost:8000/api/auth/me/');
};
```

### Update Profile

```javascript
// PUT /api/auth/profile/update/
const updateProfile = async (profileData) => {
  return await makeAuthRequest('http://localhost:8000/api/auth/profile/update/', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
};
```

### Submit Verification

```javascript
// POST /api/auth/profile/verification/
const submitVerification = async (formData) => {
  const token = localStorage.getItem('access_token');

  const response = await fetch('http://localhost:8000/api/auth/profile/verification/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData // FormData with images
  });

  return await response.json();
};
```

## Error Handling

```javascript
const handleAPIError = (error) => {
  if (error.error && error.error.message) {
    // Display error message to user
    console.error('API Error:', error.error.message);
    return error.error.message;
  }
  return 'خطای غیرمنتظره رخ داد';
};

// Usage
try {
  const data = await placeOrder('buy', 500000);
  if (!data.success) {
    const errorMessage = handleAPIError(data);
    // Show error to user
  }
} catch (error) {
  console.error('Network error:', error);
}
```

## React/Next.js Integration Example

### Create API Service

```javascript
// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class TalabinAPI {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('access_token');

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    };

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return await response.json();
  }

  // Auth
  async login(phoneNumber, password) {
    return this.request('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ phone_number: phoneNumber, password })
    });
  }

  // Wallet
  async getBalance() {
    return this.request('/api/wallet/balance/');
  }

  // Trading
  async placeOrder(orderType, amount) {
    return this.request('/api/trading/orders/place_order/', {
      method: 'POST',
      body: JSON.stringify({ order_type: orderType, amount_irr: amount })
    });
  }

  // Prices
  async getCurrentPrice() {
    return this.request('/api/prices/gold/current/');
  }
}

export const api = new TalabinAPI();
```

### Use in Components

```javascript
// components/BuySell.js
import { api } from '@/lib/api';
import { useState } from 'react';

export default function BuySell() {
  const [amount, setAmount] = useState('');
  const [preview, setPreview] = useState(null);

  const handlePreview = async () => {
    const data = await api.request('/api/trading/orders/preview/', {
      method: 'POST',
      body: JSON.stringify({
        order_type: 'buy',
        amount_irr: amount
      })
    });

    if (data.success) {
      setPreview(data.data);
    }
  };

  return (
    // Your UI here
  );
}
```

## WebSocket Integration (Future Feature)

For real-time price updates, you can use Django Channels (to be implemented):

```javascript
const ws = new WebSocket('ws://localhost:8000/ws/prices/');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update price in UI
  console.log('New price:', data.price);
};
```

## Rate Limiting

The API implements rate limiting. If you exceed the rate limit, you'll receive a 429 status code.

## CORS

Make sure to add your frontend domain to `CORS_ALLOWED_ORIGINS` in the backend `.env` file.
