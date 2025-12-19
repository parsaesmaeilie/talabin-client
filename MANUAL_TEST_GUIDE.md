# Manual Testing Guide - Talabin Platform

## 🚀 Servers Running

### Backend (Django API)
- **URL**: http://localhost:8000
- **Status**: ✅ Running
- **API Docs**: http://localhost:8000/api/docs/

### Frontend (Next.js)
- **URL**: http://localhost:3000
- **Status**: ✅ Running

---

## 🧪 Quick Tests You Can Do Right Now

### 1. Open in Browser

**Frontend Application:**
```
http://localhost:3000
```
You should see the Talabin homepage with:
- Navigation bar
- Hero section
- "ورود" and "ثبت‌نام" buttons

**API Documentation:**
```
http://localhost:8000/api/docs/
```
You should see the Swagger UI with all API endpoints

**API Root:**
```
http://localhost:8000/
```
You should see a JSON response with available endpoints

---

## 🔐 Test Authentication

### Test User Credentials
```
Phone: +989123456789
Password: admin123

Alternative Test User:
Phone: +989121234567
Password: test123
```

### Login via API (using curl)
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"phone_number": "+989123456789", "password": "admin123"}'
```

**Expected Result:** You should get a JSON response with:
- `"success": true`
- JWT tokens (access & refresh)
- User information

### Login via Frontend
1. Go to http://localhost:3000/login
2. Enter phone: `+989123456789`
3. Enter password: `admin123`
4. Click "ورود به حساب کاربری"

---

## 💰 Test Gold Prices

### View Current Price
**In Browser:**
```
http://localhost:8000/api/prices/gold/current/
```

**Using curl:**
```bash
curl http://localhost:8000/api/prices/gold/current/
```

**Expected Result:**
```json
{
  "success": true,
  "data": {
    "buy_price": "2950000.00",
    "sell_price": "3050000.00",
    "spread": 100000.0,
    "is_active": true
  }
}
```

### View Price History
```
http://localhost:8000/api/prices/gold/history/
```

---

## 📱 Test Complete User Flow

### Step 1: View Homepage
```
http://localhost:3000
```
- Check if page loads
- Check if prices are displayed
- Check navigation menu

### Step 2: Try to Access Protected Page
```
http://localhost:3000/dashboard
```
- Should redirect to login (if not authenticated)

### Step 3: Login
```
http://localhost:3000/login
```
- Use credentials: +989123456789 / admin123
- Should get JWT token and redirect to dashboard

### Step 4: View Dashboard
```
http://localhost:3000/dashboard
```
- Should show user dashboard
- Should display wallet balance
- Should show recent transactions

### Step 5: View Prices
```
http://localhost:3000/dashboard/prices/gold
```
- Should show current gold prices
- Should display price chart (if implemented)

---

## 🛒 Test Trading Features

### Get User Orders (Need to be logged in)

**First, login and get token:**
```bash
TOKEN=$(curl -s -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"phone_number": "+989123456789", "password": "admin123"}' \
  | python -m json.tool | grep access | cut -d'"' -f4)

echo $TOKEN
```

**Then get orders:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/trading/orders/
```

---

## 💼 Test Wallet Features

### View Wallet (Need token from login above)
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/wallet/
```

### View Bank Accounts
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/wallet/bank-accounts/
```

### View Deposits
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/wallet/deposits/
```

---

## 🔍 Test API Documentation

### Swagger UI (Interactive)
```
http://localhost:8000/api/docs/
```

**What you can do:**
1. Browse all available endpoints
2. See request/response schemas
3. Try API calls directly from browser
4. View authentication requirements

### OpenAPI Schema
```
http://localhost:8000/api/schema/
```
- Raw OpenAPI 3.0 schema in JSON format

---

## 🧪 Test CORS

### From Frontend to Backend
1. Open http://localhost:3000
2. Open browser DevTools (F12)
3. Go to Console tab
4. Run this command:
```javascript
fetch('http://localhost:8000/api/prices/gold/current/')
  .then(r => r.json())
  .then(d => console.log(d))
```

**Expected:** Should return price data without CORS errors

---

## 📊 Test Different Scenarios

### Scenario 1: New User Registration
1. Go to http://localhost:3000/register
2. Fill in registration form
3. Submit
4. Check if OTP is sent (check backend console for OTP code in debug mode)
5. Verify OTP

### Scenario 2: Password Reset
1. Go to http://localhost:3000/forgot-password
2. Enter phone number
3. Request OTP
4. Check backend console for OTP
5. Reset password

### Scenario 3: View Price History
1. Login to application
2. Navigate to prices page
3. View price chart
4. Check different timeframes (1h, 24h, 7d, 30d)

### Scenario 4: Create Order (if implemented)
1. Login
2. Go to trading page
3. Enter amount to buy/sell
4. Submit order
5. Check order history

---

## 🔧 Troubleshooting

### Backend Not Responding?
Check if server is running:
```bash
curl http://localhost:8000/
```

If not running, restart:
```bash
cd backend
../backend/venv/Scripts/python.exe manage.py runserver
```

### Frontend Not Loading?
Check if server is running:
```bash
curl http://localhost:3000/
```

If not running, restart:
```bash
npm run dev
```

### Database Issues?
Run migrations:
```bash
cd backend
../backend/venv/Scripts/python.exe manage.py migrate
```

### Need Fresh Test Data?
```bash
cd backend
../backend/venv/Scripts/python.exe create_test_data.py
```

---

## 📝 What to Check

### ✅ Frontend Checklist
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Login page accessible
- [ ] Register page accessible
- [ ] Responsive design (test on mobile view)
- [ ] Persian text displays correctly (RTL)
- [ ] Forms are functional
- [ ] Links navigate correctly

### ✅ Backend Checklist
- [ ] API root returns endpoint list
- [ ] Swagger docs load
- [ ] Login endpoint works
- [ ] Prices API returns data
- [ ] Protected endpoints require authentication
- [ ] CORS headers present
- [ ] Error messages in Persian
- [ ] Rate limiting active (try multiple rapid requests)

### ✅ Integration Checklist
- [ ] Frontend can call backend APIs
- [ ] CORS allows cross-origin requests
- [ ] JWT tokens work for authentication
- [ ] Error handling displays properly
- [ ] Loading states work
- [ ] Data displays correctly

---

## 🎯 Expected Behavior

### Working Features
✅ User authentication (login/register/logout)
✅ OTP generation and validation
✅ Gold price display
✅ Price history
✅ User profile management
✅ Wallet balance display
✅ Order history
✅ Bank account management
✅ API documentation

### Debug Mode Features (Development Only)
- OTP codes printed to console (not sent via SMS)
- Detailed error messages
- Stack traces on errors
- CORS allows localhost

---

## 🚨 Common Issues

### Issue: "CORS Error"
**Solution:** Make sure backend is running and CORS_ALLOWED_ORIGINS includes http://localhost:3000

### Issue: "401 Unauthorized"
**Solution:** You need to login first and include the JWT token in Authorization header

### Issue: "Persian text shows as ???"
**Solution:** Make sure your browser supports UTF-8 encoding

### Issue: "Page not found"
**Solution:** Check that you're using the correct port (3000 for frontend, 8000 for backend)

---

## 📞 Need Help?

### Backend Logs
Check terminal where backend is running for error messages

### Frontend Logs
Check browser DevTools Console (F12 → Console)

### Database
```bash
cd backend
../backend/venv/Scripts/python.exe manage.py dbshell
```

---

## 🎉 Happy Testing!

Everything is ready for you to test. Both servers are running and all core features are functional.

**Start here:** http://localhost:3000

**Test Credentials:**
- Phone: `+989123456789`
- Password: `admin123`
