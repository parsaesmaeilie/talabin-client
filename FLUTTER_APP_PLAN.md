# Talabin Flutter Mobile App - Implementation Plan

## Executive Summary

Create a Flutter mobile app (Android & iOS) for the Talabin gold trading platform using **Riverpod** state management and Clean Architecture. The app will integrate with the existing Django backend (http://localhost:8000/api) and replicate the web app's design system.

### Key Decisions
- **State Management**: Riverpod (type-safe, modern)
- **Architecture**: Clean Architecture (Domain/Data/Presentation layers)
- **Existing Documentation**: Comprehensive planning already exists in `flutter_app_plan/` directory
- **Priority**: Authentication → Dashboard/Wallet → Trading → Additional Features

---

## Project Context

### Backend API (37+ Endpoints)
- **Authentication**: Login, OTP verification, token refresh
- **Wallet**: Balance, transactions, deposits, withdrawals, bank accounts
- **Trading**: Buy/sell orders, order preview, history
- **Prices**: Current gold price, historical data
- **Installments**: Plans, subscriptions, payments

### Design System (from Web App)
- **Primary Color**: #FFC857 (gold)
- **Font**: Vazirmatn (Persian)
- **Border Radius**: 8-24px (rounded corners)
- **Components**: Cards, buttons, forms with RTL support
- **Animations**: fadeIn, slideInUp, shimmer

---

## Phase 1: Project Setup

### 1.1 Create Flutter Project
```bash
cd E:\داشبورد\talabin-client
flutter create --org com.talabin --project-name talabin_mobile talabin_mobile
cd talabin_mobile
```

### 1.2 Update pubspec.yaml
**File**: `talabin_mobile/pubspec.yaml`

Key dependencies:
- `flutter_riverpod: ^2.5.1` - State management
- `riverpod_annotation: ^2.3.5` - Code generation
- `dio: ^5.4.3` - HTTP client
- `flutter_secure_storage: ^9.0.0` - Token storage
- `hive: ^2.2.3` - Local caching
- `freezed: ^2.4.7` - Immutable models
- `persian_number_utility: ^1.1.3` - Persian numbers
- `pin_code_fields: ^8.0.1` - OTP input
- `fl_chart: ^0.66.2` - Charts

### 1.3 Create Folder Structure
```
lib/
├── core/
│   ├── api/ (dio_client.dart, dio_provider.dart)
│   ├── constants/ (api_constants.dart, app_constants.dart)
│   ├── errors/ (failures.dart, exceptions.dart)
│   └── theme/ (app_colors.dart, app_theme.dart)
├── features/
│   ├── auth/
│   │   ├── data/ (models, datasources, repositories)
│   │   ├── domain/ (entities, repositories)
│   │   └── presentation/ (pages, providers, widgets)
│   ├── dashboard/
│   ├── wallet/
│   ├── trading/
│   └── profile/
└── shared/ (widgets, utils, extensions)
```

### 1.4 Add Persian Fonts
Download Vazirmatn font and place in `assets/fonts/`:
- Vazirmatn-Regular.ttf
- Vazirmatn-Medium.ttf (500)
- Vazirmatn-SemiBold.ttf (600)
- Vazirmatn-Bold.ttf (700)

---

## Phase 2: Core Infrastructure

### 2.1 Dio HTTP Client
**File**: `lib/core/api/dio_client.dart`

Key features:
- Base URL configuration (Android: 10.0.2.2, iOS: localhost)
- Token interceptor (auto-add Bearer token)
- Token refresh on 401 errors
- Persian language header
- Pretty logger in debug mode

### 2.2 Riverpod Providers
**File**: `lib/core/api/dio_provider.dart`

```dart
final secureStorageProvider = Provider<FlutterSecureStorage>(...);
final dioClientProvider = Provider<DioClient>(...);
```

### 2.3 Error Handling
**File**: `lib/core/errors/failures.dart`

Create failure classes:
- `ServerFailure` (API errors)
- `NetworkFailure` (connection issues)
- `UnauthorizedFailure` (401)
- `ValidationFailure` (form errors)

### 2.4 App Theme
**File**: `lib/core/theme/app_theme.dart`

Match web design system:
- Primary color: #FFC857
- Card background: #FFFFFF
- Border radius: 14-24px
- Shadows: soft, layered
- Typography: Vazirmatn font family

---

## Phase 3: Authentication Feature (PRIORITY)

### 3.1 Domain Layer

**Entities**:
- `User` (id, phoneNumber, firstName, lastName, isVerified)
- `AuthTokens` (accessToken, refreshToken)

**Repository Interface**: `AuthRepository`
- `sendOtp(phoneNumber)`
- `verifyOtp(phoneNumber, otpCode)`
- `getProfile()`
- `logout()`

### 3.2 Data Layer

**Models**: `UserModel` (with JSON serialization)

**Data Source**: `AuthRemoteDataSource`
- Implements API calls using Dio
- Throws `AppException` on errors

**Repository Implementation**: `AuthRepositoryImpl`
- Implements `AuthRepository`
- Returns `Either<Failure, T>` (dartz)
- Saves tokens to secure storage

### 3.3 Presentation Layer (Riverpod)

**Provider**: `lib/features/auth/presentation/providers/auth_providers.dart`

```dart
// Auth State
enum AuthStatus { initial, loading, authenticated, unauthenticated, error }

class AuthState {
  final AuthStatus status;
  final User? user;
  final String? errorMessage;
}

// Auth Notifier
class AuthNotifier extends StateNotifier<AuthState> {
  Future<bool> sendOtp(String phoneNumber);
  Future<bool> verifyOtp(String phoneNumber, String otpCode);
  Future<void> loadUserProfile();
  Future<void> logout();
}

// Provider
final authStateProvider = StateNotifierProvider<AuthNotifier, AuthState>(...);
```

**Screens**:
1. **LoginPage** (`lib/features/auth/presentation/pages/login_page.dart`)
   - Phone number input
   - Send OTP button
   - Form validation
   - Navigate to OTP page

2. **OtpVerificationPage** (`lib/features/auth/presentation/pages/otp_verification_page.dart`)
   - 6-digit PIN input (pin_code_fields package)
   - Auto-verify on completion
   - Resend OTP with countdown timer
   - Navigate to dashboard on success

---

## Phase 4: Dashboard & Wallet

### 4.1 Domain Entities

**Wallet**:
- `id`, `userId`
- `irrBalance`, `goldBalance`
- `totalValue`

**Transaction**:
- `id`, `type` (deposit/withdrawal/buy/sell)
- `amount`, `currency`
- `status` (pending/completed/rejected)
- `createdAt`

**GoldPrice**:
- `buyPrice`, `sellPrice`
- `timestamp`, `change24h`

### 4.2 Riverpod Providers

**File**: `lib/features/dashboard/presentation/providers/dashboard_providers.dart`

```dart
// Gold price (auto-refresh every 30s)
final currentGoldPriceProvider = FutureProvider<GoldPrice>(...);

// Wallet balance
final walletBalanceProvider = FutureProvider<Wallet>(...);

// Recent transactions (last 5)
final recentTransactionsProvider = FutureProvider<List<Transaction>>(...);
```

### 4.3 Dashboard UI

**Screen**: `DashboardPage` (`lib/features/dashboard/presentation/pages/dashboard_page.dart`)

Layout:
- App bar with logo and notifications
- Greeting text
- **Gold Price Card** (current buy/sell prices)
- **Wallet Balance Cards** (IRR + Gold)
- **Quick Actions** (Buy/Sell buttons)
- **Recent Transactions List**
- Pull-to-refresh

---

## Phase 5: Trading Feature

### 5.1 Domain

**TradeOrder Entity**:
- `orderType` (buy/sell)
- `amount`, `price`, `totalPrice`
- `status`, `createdAt`

**Repository**:
- `placeOrder(orderType, amount)`
- `getOrderHistory()`
- `cancelOrder(orderId)`

### 5.2 Trading Provider

```dart
class TradingState {
  final bool isLoading;
  final TradeOrder? order;
  final Failure? failure;
}

class TradingNotifier extends StateNotifier<TradingState> {
  Future<bool> placeOrder({required OrderType type, required double amount});
}

final tradingProvider = StateNotifierProvider<TradingNotifier, TradingState>(...);
```

### 5.3 Trading Screen

**Screen**: `TradingPage` (`lib/features/trading/presentation/pages/trading_page.dart`)

Features:
- Tab switcher (Buy/Sell) with pill-style design
- Current price display
- Amount input (grams)
- Quick amount buttons (0.1, 0.5, 1.0, 2.0)
- Available balance display
- **Trade button** (green for buy, red for sell)
- Confirmation dialog before placing order
- Error handling with user-friendly messages

---

## Phase 6: Additional Features

Following same Clean Architecture + Riverpod pattern:

### 6.1 Profile Management
- View/edit profile
- Change password
- Identity verification

### 6.2 Bank Accounts
- List bank accounts
- Add new account
- Set default account

### 6.3 Deposit/Withdrawal
- Create deposit request
- Upload receipt
- Create withdrawal request
- Track status

### 6.4 Installments (Optional)
- Browse plans
- Subscribe to plan
- Pay installments

---

## Phase 7: Polish & Testing

### 7.1 Persian Localization
- Use `persian_number_utility` for number formatting
- RTL layout support
- Persian date formatting

### 7.2 Error States
- Empty states with illustrations
- Loading skeletons (shimmer effect)
- Error messages in Persian

### 7.3 Testing
- Unit tests for repositories
- Widget tests for UI components
- Integration tests for critical flows

---

## Phase 8: Build & Deploy

### Android
```bash
flutter build apk --release
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
```

---

## Critical Files to Create

### Core Infrastructure
1. `lib/core/api/dio_client.dart` - HTTP client with token management
2. `lib/core/api/dio_provider.dart` - Riverpod provider for Dio
3. `lib/core/theme/app_theme.dart` - Theme matching web design
4. `lib/core/errors/failures.dart` - Error handling

### Authentication
5. `lib/features/auth/domain/entities/user.dart` - User entity
6. `lib/features/auth/data/repositories/auth_repository_impl.dart` - Auth repository
7. `lib/features/auth/presentation/providers/auth_providers.dart` - Riverpod auth state
8. `lib/features/auth/presentation/pages/login_page.dart` - Login screen
9. `lib/features/auth/presentation/pages/otp_verification_page.dart` - OTP screen

### Dashboard
10. `lib/features/dashboard/presentation/providers/dashboard_providers.dart` - Dashboard state
11. `lib/features/dashboard/presentation/pages/dashboard_page.dart` - Home screen

### Trading
12. `lib/features/trading/presentation/pages/trading_page.dart` - Buy/Sell screen

### Main App
13. `lib/main.dart` - App entry point with ProviderScope

---

## Implementation Timeline

**Week 1**: Core + Auth (login, OTP, token management)
**Week 2**: Dashboard + Wallet (prices, balance, transactions)
**Week 3**: Trading (buy/sell with confirmation)
**Week 4**: Profile + Bank Accounts
**Week 5**: Polish + Testing
**Week 6**: Build + Deploy

---

## Key Advantages of This Approach

1. **Riverpod**: Type-safe, testable, better than Provider
2. **Clean Architecture**: Maintainable, scalable, testable
3. **Existing Plans**: Leverage 880+ lines of documentation
4. **Design System Match**: Consistent with web app
5. **Offline Support**: Hive caching for critical data
6. **Persian First**: RTL layout, Persian numbers, Farsi text

---

## Next Steps After Plan Approval

1. Create Flutter project
2. Setup dependencies and folders
3. Implement core infrastructure (Dio, theme, errors)
4. Build authentication feature (highest priority)
5. Implement dashboard and wallet
6. Add trading functionality
7. Polish and test
8. Build and deploy

---

## Reference Documentation

- Existing plans: `E:\داشبورد\talabin-client\flutter_app_plan\`
- Backend API docs: `E:\داشبورد\talabin-client\backend\API_GUIDE.md`
- Web design system: `E:\داشبورد\talabin-client\app\globals.css`
- Backend status: All 37+ endpoints complete and tested
