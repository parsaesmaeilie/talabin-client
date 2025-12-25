# Talabin Mobile App - Flutter Implementation Plan

## Overview
This document outlines the complete plan for building a Flutter mobile application for the Talabin digital gold trading platform. The mobile app will provide all the functionality available in the Next.js web application, optimized for iOS and Android devices.

## Project Information
- **App Name**: Talabin Mobile
- **Package Name**: com.talabin.mobile
- **Platforms**: Android & iOS
- **Framework**: Flutter (Latest stable version)
- **Language**: Dart
- **Backend API**: Django REST Framework (http://localhost:8000/api)

## Current Status
- **Web App**: Fully functional Next.js application with backend integration
- **Backend**: Django REST API - 100% complete and tested
- **Mobile App**: Planning phase (this document)

## App Purpose
Talabin Mobile is a digital gold trading platform that allows users to:
- Buy and sell gold using Iranian Rials (Toman)
- Manage their multi-currency wallet (IRR + Gold)
- Track real-time gold prices
- Make deposits and withdrawals
- View transaction history and analytics
- Manage installment payment plans

## Target Users
- Iranian users who want to invest in digital gold
- Users seeking a secure, mobile-first gold trading experience
- Both novice and experienced investors

## Key Requirements

### Functional Requirements
1. User authentication with phone number and OTP
2. Real-time gold price tracking
3. Buy/sell gold operations
4. Multi-currency wallet management (Toman + Gold)
5. Deposit and withdrawal requests
6. Transaction history viewing
7. Profile and bank account management
8. Installment plan subscription
9. Push notifications for price alerts
10. Offline support for viewing cached data

### Non-Functional Requirements
1. **Performance**: Smooth 60fps animations, <2s app launch time
2. **Security**: Secure token storage, encrypted communications (HTTPS)
3. **Reliability**: Handle network failures gracefully
4. **Usability**: Intuitive Persian/Farsi RTL interface
5. **Compatibility**: Support Android 7+ and iOS 12+
6. **Offline**: Cache critical data for offline viewing

## Technology Stack

### Core Framework
- **Flutter SDK**: Latest stable version
- **Dart**: Latest stable version

### State Management
- **Provider** or **Riverpod**: For app-wide state management
- **flutter_bloc** (alternative): If complex state management needed

### Networking & API
- **dio**: HTTP client for API calls
- **retrofit** (optional): Type-safe API client generation
- **pretty_dio_logger**: API request/response logging

### Local Storage
- **shared_preferences**: Simple key-value storage for tokens/settings
- **hive** or **sqflite**: Local database for caching data
- **flutter_secure_storage**: Secure storage for sensitive data (tokens, passwords)

### Authentication
- **JWT tokens**: Access and refresh tokens from backend
- **OTP verification**: Phone number authentication

### UI Components
- **persian_number_utility**: Persian number formatting
- **flutter_svg**: SVG icon support
- **cached_network_image**: Efficient image loading and caching
- **shimmer**: Loading skeleton screens
- **fl_chart**: Beautiful charts for price history
- **intl**: Internationalization and number formatting

### Utilities
- **get_it**: Dependency injection
- **dartz**: Functional programming (Either for error handling)
- **equatable**: Value equality for objects
- **freezed** (optional): Immutable data classes

### Push Notifications
- **firebase_messaging**: Push notifications
- **flutter_local_notifications**: Local notifications

### Additional Features
- **share_plus**: Share functionality
- **url_launcher**: Open external links
- **permission_handler**: Handle device permissions
- **connectivity_plus**: Network connectivity detection

## App Architecture

### Clean Architecture Layers

```
lib/
├── core/                    # Core functionality
│   ├── api/                # API client setup
│   ├── constants/          # App constants
│   ├── errors/             # Error handling
│   ├── network/            # Network utilities
│   ├── storage/            # Local storage
│   └── theme/              # App theme (colors, typography)
│
├── features/               # Feature modules
│   ├── auth/              # Authentication
│   │   ├── data/          # Data sources, repositories
│   │   ├── domain/        # Entities, use cases
│   │   └── presentation/  # UI, state management
│   │
│   ├── dashboard/         # Main dashboard
│   ├── wallet/            # Wallet management
│   ├── trading/           # Buy/sell gold
│   ├── transactions/      # Transaction history
│   ├── profile/           # User profile
│   └── installments/      # Installment plans
│
├── shared/                # Shared widgets and utilities
│   ├── widgets/           # Reusable widgets
│   └── utils/             # Helper functions
│
└── main.dart             # App entry point
```

### Design Pattern
- **Clean Architecture**: Separation of concerns (presentation, domain, data)
- **Repository Pattern**: Abstract data sources
- **Provider/Bloc Pattern**: State management
- **Dependency Injection**: Using GetIt service locator

## API Integration

### Base Configuration
```dart
Base URL: http://localhost:8000/api/  (Development)
          https://api.talabin.com/api/ (Production)

Headers:
  - Content-Type: application/json
  - Authorization: Bearer {access_token}
  - Accept-Language: fa
```

### Authentication Flow
1. User enters phone number
2. App sends OTP request → `POST /auth/send-otp/`
3. User enters OTP code
4. App verifies OTP → `POST /auth/verify-otp/`
5. Backend returns JWT tokens (access + refresh)
6. App stores tokens securely
7. App includes access token in all subsequent requests

### Token Management
- Store access token in secure storage
- Store refresh token in secure storage
- Implement automatic token refresh on 401 errors
- Clear tokens on logout

### Key API Endpoints

**Authentication**
- `POST /auth/register/` - Register new user
- `POST /auth/login/` - Login with phone/password
- `POST /auth/send-otp/` - Send OTP to phone
- `POST /auth/verify-otp/` - Verify OTP code
- `GET /auth/profile/` - Get user profile
- `PUT /auth/profile/` - Update profile

**Wallet**
- `GET /wallet/balance/` - Get wallet balance
- `GET /wallet/transactions/` - Transaction history
- `POST /wallet/deposit/` - Create deposit request
- `POST /wallet/withdraw/` - Create withdrawal request
- `GET /wallet/bank-accounts/` - Get bank accounts
- `POST /wallet/bank-accounts/` - Add bank account

**Trading**
- `GET /prices/gold/current/` - Get current gold price
- `GET /prices/gold/history/` - Get price history
- `POST /trading/orders/` - Place buy/sell order
- `GET /trading/orders/` - Get order history
- `GET /trading/orders/{id}/` - Get order details

**Installments**
- `GET /installments/plans/` - Get available plans
- `POST /installments/subscriptions/` - Subscribe to plan
- `GET /installments/subscriptions/` - Get user subscriptions

## UI/UX Design

### Design Principles
1. **RTL Support**: Full Persian/Farsi right-to-left layout
2. **Material Design**: Follow Material Design 3 guidelines
3. **Consistency**: Match web app's design language
4. **Accessibility**: Support screen readers, larger text
5. **Responsiveness**: Support various screen sizes

### Color Scheme (Based on web app)
```dart
Primary Color: #D4AF37 (Gold)
Background: #0A0F1E (Dark blue)
Surface: #1A1F2E (Lighter dark blue)
Error: #EF4444 (Red)
Success: #10B981 (Green)
Text Primary: #FFFFFF (White)
Text Secondary: #9CA3AF (Gray)
```

### Typography
- **Font Family**: Vazir or IRANSans (Persian fonts)
- **Headings**: Bold, larger sizes
- **Body**: Regular weight
- **Numbers**: Tabular figures for better alignment

### Screen List

#### 1. Splash Screen
- App logo
- Loading animation
- Version number

#### 2. Onboarding (First launch only)
- 3-4 slides explaining app features
- Skip/Next buttons
- Get Started button

#### 3. Authentication Screens
- **Login Screen**: Phone number input, password (optional)
- **OTP Screen**: 6-digit OTP input
- **Register Screen**: User information form

#### 4. Main Dashboard
- Gold price chart (real-time)
- Wallet balance cards (Toman + Gold)
- Quick actions (Buy/Sell)
- Recent transactions
- Bottom navigation bar

#### 5. Wallet Screen
- Balance overview
- Deposit button
- Withdraw button
- Transaction history list
- Bank account management

#### 6. Trading Screen
- **Buy Gold**: Amount input, price calculation
- **Sell Gold**: Amount input, price calculation
- Order confirmation
- Success/Error feedback

#### 7. Transaction History
- Filterable list (All/Deposits/Withdrawals/Trades)
- Transaction detail view
- Date range filter

#### 8. Profile Screen
- User information display
- Edit profile
- Bank accounts
- Settings
- Logout

#### 9. Installment Plans
- Available plans list
- Plan details
- Subscribe to plan
- Active subscriptions

#### 10. Settings
- Language selection (if multi-language)
- Notifications preferences
- Security settings
- About app
- Terms & Privacy

### Navigation Structure
```
Bottom Navigation:
├── Dashboard (Home)
├── Wallet
├── Trading
├── History
└── Profile

Side Drawer (Optional):
├── Settings
├── Help & Support
├── About
└── Logout
```

## Data Models

### User Model
```dart
class User {
  final int id;
  final String phoneNumber;
  final String? firstName;
  final String? lastName;
  final String? email;
  final String? nationalCode;
  final bool isVerified;
}
```

### Wallet Model
```dart
class Wallet {
  final int id;
  final double irrBalance;    // Toman balance
  final double goldBalance;   // Gold balance (grams)
  final double totalValue;    // Total value in Toman
}
```

### Transaction Model
```dart
class Transaction {
  final int id;
  final String type;          // DEPOSIT, WITHDRAWAL, BUY, SELL
  final double amount;
  final String currency;      // IRR or GOLD
  final String status;        // PENDING, COMPLETED, REJECTED
  final DateTime createdAt;
  final String? description;
}
```

### Gold Price Model
```dart
class GoldPrice {
  final int id;
  final double buyPrice;      // Buy price per gram
  final double sellPrice;     // Sell price per gram
  final DateTime timestamp;
  final double change24h;     // 24h price change percentage
}
```

### Trade Order Model
```dart
class TradeOrder {
  final int id;
  final String orderType;     // BUY or SELL
  final double amount;        // Amount in grams
  final double price;         // Price per gram
  final double totalPrice;    // Total price in Toman
  final String status;
  final DateTime createdAt;
}
```

## Security Considerations

### Token Storage
- Use `flutter_secure_storage` for storing JWT tokens
- Never store tokens in SharedPreferences (not encrypted)
- Implement secure token refresh mechanism

### API Security
- All API calls over HTTPS in production
- Validate SSL certificates
- Implement certificate pinning (advanced)

### Sensitive Data
- Never log sensitive data (tokens, passwords, OTP codes)
- Clear sensitive data from memory after use
- Implement biometric authentication (fingerprint/face)

### Input Validation
- Validate all user inputs
- Sanitize data before sending to API
- Handle edge cases (negative numbers, large values)

## Testing Strategy

### Unit Tests
- Test data models
- Test repository methods
- Test business logic
- Test utility functions

### Widget Tests
- Test individual widgets
- Test user interactions
- Test state changes

### Integration Tests
- Test complete user flows
- Test API integration
- Test navigation

### Testing Tools
- `flutter_test`: Built-in testing framework
- `mockito`: Mocking dependencies
- `integration_test`: End-to-end testing

## Performance Optimization

### Image Optimization
- Use `cached_network_image` for network images
- Compress images before uploading
- Use appropriate image formats (WebP when possible)

### List Performance
- Use `ListView.builder` for long lists
- Implement pagination for transactions
- Use `AutomaticKeepAliveClientMixin` for tabs

### Build Optimization
- Split large widgets into smaller ones
- Use `const` constructors where possible
- Avoid unnecessary rebuilds with `Selector` or `Consumer`

### Network Optimization
- Cache API responses
- Implement offline mode
- Compress request/response data
- Use pagination for large datasets

## Offline Support

### Cached Data
- Gold prices (last known price)
- Wallet balance (last synced)
- Transaction history (recent transactions)
- User profile

### Offline Functionality
- View cached data when offline
- Queue actions for when online
- Show offline indicator
- Sync data when connection restored

## Push Notifications

### Notification Types
1. **Price Alerts**: Gold price reaches target
2. **Transaction Updates**: Deposit/withdrawal approved
3. **Order Fulfillment**: Trade order completed
4. **Security Alerts**: Login from new device
5. **Promotional**: New features, offers

### Implementation
- Use Firebase Cloud Messaging (FCM)
- Request notification permissions
- Handle notifications in foreground/background
- Deep linking to relevant screens

## Localization

### Language Support
- Primary: Persian/Farsi (fa)
- Optional: English (en)

### Localization Strategy
- Use `flutter_localizations`
- Separate language files
- Support RTL layout
- Format numbers in Persian

## Build & Deployment

### Android
- **Min SDK**: 21 (Android 5.0)
- **Target SDK**: Latest stable
- **Build Type**: Release APK or AAB (App Bundle)
- **Signing**: Configure keystore for release builds

### iOS
- **Min iOS**: 12.0
- **Build**: Xcode archive
- **Signing**: Configure provisioning profiles
- **Distribution**: TestFlight → App Store

### Environment Configuration
```dart
Development:
  - API URL: http://localhost:8000/api/
  - Debug mode enabled
  - Logging enabled

Production:
  - API URL: https://api.talabin.com/api/
  - Debug mode disabled
  - Logging disabled
  - Obfuscation enabled
```

## Development Timeline Estimate

### Phase 1: Setup & Foundation (Week 1)
- Create Flutter project structure
- Set up dependencies
- Configure API client
- Implement authentication flow

### Phase 2: Core Features (Week 2-3)
- Dashboard screen
- Wallet management
- Trading functionality
- Transaction history

### Phase 3: Additional Features (Week 4)
- Profile management
- Installment plans
- Settings
- Push notifications

### Phase 4: Polish & Testing (Week 5)
- UI/UX refinements
- Bug fixes
- Performance optimization
- Testing (unit, widget, integration)

### Phase 5: Deployment (Week 6)
- Build preparation
- App store assets
- Beta testing
- Production release

## Success Metrics

### Technical Metrics
- App launch time: < 2 seconds
- API response time: < 1 second
- Crash-free rate: > 99%
- Frame rate: Consistent 60fps

### Business Metrics
- Daily active users
- Transaction completion rate
- User retention rate
- App store rating: > 4.5 stars

## Known Challenges & Solutions

### Challenge 1: Real-time Price Updates
**Solution**: Implement WebSocket connection or polling mechanism

### Challenge 2: Secure Token Storage
**Solution**: Use flutter_secure_storage with proper error handling

### Challenge 3: Network Connectivity
**Solution**: Implement robust offline support and retry mechanisms

### Challenge 4: Persian/Farsi Support
**Solution**: Use appropriate fonts, RTL layout, and Persian number formatting

## References

### Existing Web App
- Location: `E:\داشبورد\talabin-client\`
- Frontend: Next.js 16 with React 19
- Backend: Django REST Framework

### API Documentation
- Swagger UI: http://localhost:8000/api/docs/
- OpenAPI Schema: http://localhost:8000/api/schema/

### Design Reference
- Web App Design: Match the existing Next.js application
- Colors, fonts, and layout should be consistent

## Next Steps

1. **Resolve Flutter Network Issue**: Fix pub.dev connectivity
2. **Create Flutter Project**: `flutter create talabin_mobile`
3. **Set Up Project Structure**: Implement clean architecture folders
4. **Install Dependencies**: Add all required packages
5. **Implement API Client**: Set up Dio with interceptors
6. **Build Authentication**: Login, OTP, token management
7. **Develop Core Screens**: Dashboard, wallet, trading
8. **Add Advanced Features**: Notifications, offline support
9. **Test Thoroughly**: Unit, widget, integration tests
10. **Deploy**: Build and release to app stores

## Contact & Support

For questions or clarifications during implementation:
- Refer to existing web app code
- Check backend API documentation
- Review Django models for data structure
- Test APIs using Swagger UI

---

**Document Version**: 1.0
**Last Updated**: December 24, 2025
**Status**: Planning Phase
**Next Review**: After network issue resolution
