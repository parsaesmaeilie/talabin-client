# 401 Unauthorized Error - FIXED

## 🐛 Problem

After implementing the login functionality, users were getting a **401 Unauthorized** error when trying to log in.

### Root Cause:
The API client was:
1. Loading old/expired tokens from `localStorage` on initialization
2. Sending these invalid tokens with the login request
3. Backend was rejecting the login request because it saw an `Authorization` header with an expired/invalid token

### Why This Happened:
```javascript
// API Client constructor loaded token automatically
constructor(baseURL: string) {
  this.baseURL = baseURL;
  if (typeof window !== 'undefined') {
    this.token = localStorage.getItem('access_token'); // ❌ Old token loaded!
  }
}
```

When a user tried to log in:
1. Old token loaded from localStorage
2. Login request sent WITH Authorization header
3. Backend saw expired token and returned 401
4. Login failed even with correct credentials

---

## ✅ Solution

### Fix 1: Clear Token Before Login
```javascript
// In authService.login()
async login(data: LoginData) {
  // Clear any existing token before login
  apiClient.setToken(null); // ✅ Remove old token first!

  const response = await apiClient.post('/auth/login/', data);
  // ... rest of code
}
```

### Fix 2: Don't Send Auth Header for Public Endpoints
```javascript
// In apiClient.request()
const publicEndpoints = ['/auth/login/', '/auth/register/', '/auth/send-otp/'];
const isPublicEndpoint = publicEndpoints.some(pe => endpoint.includes(pe));

if (this.token && !isPublicEndpoint) {
  headers['Authorization'] = `Bearer ${this.token}`; // ✅ Skip for login!
}
```

### Fix 3: Clear localStorage Before Login
```javascript
// In login page onSubmit
// Clear any previous session data
if (typeof window !== 'undefined') {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}
```

---

## 🧪 How to Test

### Step 1: Clear Browser Data (Important!)
1. Open DevTools (F12)
2. Go to Application tab
3. Local Storage → http://localhost:3000
4. **Right-click and "Clear"**
5. Refresh page

### Step 2: Try Login
```
URL: http://localhost:3000/login
Phone: 09123456789
Password: admin123
```

### Expected Result:
✅ No 401 error
✅ Login succeeds
✅ Redirects to /dashboard
✅ Token saved in localStorage

### Step 3: Try Login Again (Test Fix)
1. Stay on login page (don't logout)
2. Enter credentials again
3. Click login

**Before Fix:** 401 error
**After Fix:** ✅ Works fine (clears old token first)

---

## 🔍 Debugging

### Check Browser Console (F12 → Console)
**Before Fix:**
```
POST http://localhost:8000/api/auth/login/ 401 (Unauthorized)
```

**After Fix:**
```
POST http://localhost:8000/api/auth/login/ 200 (OK)
```

### Check Network Tab (F12 → Network)
Click on the login request and check:

**Request Headers:**
- ❌ Before: `Authorization: Bearer <expired_token>`
- ✅ After: No Authorization header on login request

**Response:**
- ❌ Before: `{"success": false, "error": {...}}`
- ✅ After: `{"success": true, "data": {...}}`

### Check Backend Logs
**Before Fix:**
```
WARNING Unauthorized: /api/auth/login/
WARNING "POST /api/auth/login/ HTTP/1.1" 401 811
```

**After Fix:**
```
INFO "POST /api/auth/login/ HTTP/1.1" 200 858
```

---

## 📋 What Was Changed

### Files Modified:

1. **`lib/api/auth.ts`**
   - Added `apiClient.setToken(null)` before login call
   - Ensures no old token interferes with login

2. **`lib/api/client.ts`**
   - Added public endpoints list
   - Skips Authorization header for login/register
   - Prevents sending token on authentication endpoints

3. **`app/(auth)/login/page.tsx`**
   - Clears localStorage before login attempt
   - Removes stale session data
   - Ensures clean state for new login

---

## 🎯 Flow Comparison

### Before Fix:
```
User clicks login
  ↓
API Client loads old token from localStorage
  ↓
Login request sent with Authorization: Bearer <old_token>
  ↓
Backend checks token → Invalid/Expired
  ↓
❌ 401 Unauthorized returned
  ↓
Login fails
```

### After Fix:
```
User clicks login
  ↓
Clear localStorage (remove old tokens)
  ↓
apiClient.setToken(null) (clear in-memory token)
  ↓
Login request sent WITHOUT Authorization header
  ↓
Backend validates credentials
  ↓
✅ 200 OK with new tokens
  ↓
Save new tokens to localStorage
  ↓
Redirect to dashboard
```

---

## 🔐 Security Implications

### ✅ Security Improvements:

1. **Clean Session State**
   - Old tokens cleared before new login
   - Prevents token confusion

2. **Proper Endpoint Handling**
   - Public endpoints don't require auth
   - Protected endpoints still require valid token

3. **No Token Leakage**
   - Expired tokens not sent unnecessarily
   - Reduces attack surface

---

## 🚨 Common Scenarios

### Scenario 1: First Time Login
**Result:** ✅ Works (no old token exists)

### Scenario 2: Re-login After Logout
**Result:** ✅ Works (logout cleared tokens)

### Scenario 3: Login with Expired Token
**Result:** ✅ Works (token cleared before login)
**Before Fix:** ❌ Failed with 401

### Scenario 4: Multiple Login Attempts
**Result:** ✅ Works (each attempt clears old tokens)
**Before Fix:** ❌ Failed after first attempt

### Scenario 5: Page Refresh During Session
**Result:** ✅ Valid token still loaded and works

---

## ✨ Additional Improvements

### Better Error Messages
Login page now shows specific errors:
- "شماره تلفن یا رمز عبور اشتباه است" (wrong credentials)
- "خطا در ارتباط با سرور" (network error)

### Loading States
- Button shows "در حال ورود..." while processing
- Form disabled during login
- Visual feedback for user

### Token Management
- Tokens saved to localStorage on success
- Tokens cleared on logout
- Fresh tokens on each login

---

## 📊 Test Results

### Manual Testing: ✅ PASSED

- [x] Fresh login works
- [x] Re-login works
- [x] Multiple login attempts work
- [x] No 401 errors on login
- [x] Token saved correctly
- [x] Redirect to dashboard works
- [x] Dashboard shows user info

### Backend Logs: ✅ CLEAN
```
INFO "POST /api/auth/login/ HTTP/1.1" 200 858
```
No more 401 errors!

---

## 🎉 Summary

**Status:** ✅ **FIXED**

The 401 Unauthorized error was caused by expired tokens being sent with login requests. The fix ensures that:

1. ✅ Old tokens are cleared before login
2. ✅ No Authorization header sent to login endpoint
3. ✅ Fresh session state for each login attempt
4. ✅ Proper error handling and user feedback

**Test it now:**
1. Go to: http://localhost:3000/login
2. Enter: `09123456789` / `admin123`
3. Click login
4. ✅ Should work without any 401 errors!

---

## 🔧 If You Still See Issues

### Clear Everything:
```javascript
// In browser console (F12)
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Or Use Incognito Mode:
- Press Ctrl+Shift+N (Chrome) or Ctrl+Shift+P (Firefox)
- Go to http://localhost:3000/login
- Try logging in

### Check Backend is Running:
```bash
curl http://localhost:8000/
```
Should return API endpoint list

---

**Fixed:** December 19, 2025
**Issue:** 401 Unauthorized on login
**Solution:** Clear old tokens before authentication
**Status:** ✅ Working
