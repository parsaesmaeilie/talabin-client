# Backend API Testing Commands

## 1. Test API Root
```bash
curl http://localhost:8000/
```

## 2. Get Current Gold Price (Public)
```bash
curl http://localhost:8000/api/prices/gold/current/
```

## 3. Get Price History (Public)
```bash
curl http://localhost:8000/api/prices/gold/history/
```

**With timeframe:**
```bash
curl "http://localhost:8000/api/prices/gold/history/?timeframe=24h"
```

## 4. Login to Get Authentication Token
```bash
curl -X POST http://localhost:8000/api/auth/login/ ^
  -H "Content-Type: application/json" ^
  -d "{\"phone_number\": \"+989123456789\", \"password\": \"admin123\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "ورود با موفقیت انجام شد",
  "data": {
    "user": {
      "id": 1,
      "phone_number": "+989123456789",
      "full_name": "Admin User"
    },
    "tokens": {
      "access": "eyJ...",
      "refresh": "eyJ..."
    }
  }
}
```

## 5. Get Current User Profile (Requires Authentication)

First, save the token from login response, then:

```bash
set TOKEN=YOUR_ACCESS_TOKEN_HERE

curl -H "Authorization: Bearer %TOKEN%" ^
  http://localhost:8000/api/auth/me/
```

**One-liner (saves token automatically):**
```bash
for /f "tokens=*" %i in ('curl -s -X POST http://localhost:8000/api/auth/login/ -H "Content-Type: application/json" -d "{\"phone_number\": \"+989123456789\", \"password\": \"admin123\"}" ^| python -m json.tool ^| findstr "access"') do set TOKEN=%i
```

## 6. Get Wallet Information (Requires Authentication)
```bash
curl -H "Authorization: Bearer %TOKEN%" ^
  http://localhost:8000/api/wallet/
```

## 7. Get Trading Orders (Requires Authentication)
```bash
curl -H "Authorization: Bearer %TOKEN%" ^
  http://localhost:8000/api/trading/orders/
```

## 8. Get Bank Accounts (Requires Authentication)
```bash
curl -H "Authorization: Bearer %TOKEN%" ^
  http://localhost:8000/api/wallet/bank-accounts/
```

## 9. Create a Buy Order (Requires Authentication)
```bash
curl -X POST http://localhost:8000/api/trading/orders/ ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"order_type\": \"buy\", \"amount\": 1.5, \"order_number\": \"ORD-TEST-001\"}"
```

## 10. Create a Deposit Request (Requires Authentication)
```bash
curl -X POST http://localhost:8000/api/wallet/deposits/ ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"amount\": 1000000, \"payment_method\": \"bank_transfer\"}"
```

## 11. Register New User
```bash
curl -X POST http://localhost:8000/api/auth/register/ ^
  -H "Content-Type: application/json" ^
  -d "{\"phone_number\": \"+989121234567\", \"password\": \"test123\", \"full_name\": \"Test User\"}"
```

## 12. Send OTP
```bash
curl -X POST http://localhost:8000/api/auth/send-otp/ ^
  -H "Content-Type: application/json" ^
  -d "{\"phone_number\": \"+989123456789\"}"
```

**Note:** In development mode, OTP will be printed in the backend console/terminal.

## 13. Logout (Requires Authentication)
```bash
curl -X POST http://localhost:8000/api/auth/logout/ ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"refresh\": \"YOUR_REFRESH_TOKEN\"}"
```

## 14. Get API Schema (OpenAPI)
```bash
curl http://localhost:8000/api/schema/
```

---

## Quick Test Script

Here's a complete test script to test the main flow:

```bash
@echo off
echo ========================================
echo Testing Talabin Backend API
echo ========================================
echo.

echo [1/5] Testing API Root...
curl -s http://localhost:8000/ | python -m json.tool
echo.

echo [2/5] Testing Gold Price...
curl -s http://localhost:8000/api/prices/gold/current/ | python -m json.tool
echo.

echo [3/5] Testing Login...
curl -s -X POST http://localhost:8000/api/auth/login/ -H "Content-Type: application/json" -d "{\"phone_number\": \"+989123456789\", \"password\": \"admin123\"}" | python -m json.tool > login_response.json
echo Login successful! Token saved to login_response.json
echo.

echo [4/5] Extracting Token...
REM You'll need to manually copy the access token from login_response.json

echo [5/5] Test Complete!
echo.
echo Next steps:
echo 1. Open login_response.json
echo 2. Copy the access token
echo 3. Use it in authenticated requests
echo.
pause
```

Save this as `test-backend.bat` and run it!

---

## Testing with Python (Alternative)

If you prefer Python:

```python
import requests
import json

BASE_URL = "http://localhost:8000"

# Test 1: Get gold price
response = requests.get(f"{BASE_URL}/api/prices/gold/current/")
print("Gold Price:", json.dumps(response.json(), indent=2, ensure_ascii=False))

# Test 2: Login
login_data = {
    "phone_number": "+989123456789",
    "password": "admin123"
}
response = requests.post(f"{BASE_URL}/api/auth/login/", json=login_data)
result = response.json()
print("\nLogin:", json.dumps(result, indent=2, ensure_ascii=False))

# Get token
token = result['data']['tokens']['access']

# Test 3: Get user profile (authenticated)
headers = {"Authorization": f"Bearer {token}"}
response = requests.get(f"{BASE_URL}/api/auth/me/", headers=headers)
print("\nUser Profile:", json.dumps(response.json(), indent=2, ensure_ascii=False))
```

---

## Common Issues & Solutions

### Issue: "CORS error"
**Solution:** Make sure you're using the correct URL (http://localhost:8000, not 127.0.0.1)

### Issue: "401 Unauthorized"
**Solution:** You need to login first and include the JWT token in the Authorization header

### Issue: "Connection refused"
**Solution:** Make sure the backend server is running (check if port 8000 is open)

### Issue: "OTP not received"
**Solution:** In development mode, check the backend terminal/console for the OTP code

---

## Pro Tips

1. **Use Swagger UI** for the easiest testing experience
2. **Save your tokens** - they're valid for 1 hour
3. **Check backend console** - All requests are logged there
4. **Use Python's json.tool** to format JSON responses: `curl ... | python -m json.tool`
5. **Test rate limiting** - Try making multiple rapid requests to see rate limiting in action

---

## Test Credentials

```
Phone: +989123456789
Password: admin123

Alternative:
Phone: +989121234567
Password: test123
```
