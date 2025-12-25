# Talabin Mobile - Step-by-Step Implementation Roadmap

## Overview
This document provides a detailed, step-by-step guide for implementing the Talabin mobile application using Flutter. Follow these steps in order for a systematic development approach.

---

## Prerequisites Checklist

Before starting development:
- [ ] Flutter SDK installed (latest stable version)
- [ ] Dart SDK installed
- [ ] Android Studio or VS Code with Flutter extensions
- [ ] iOS development tools (if targeting iOS): Xcode, CocoaPods
- [ ] Backend API running and accessible
- [ ] API documentation available
- [ ] Network connectivity issue resolved (pub.dev access)

---

## Phase 1: Project Setup & Foundation

### Step 1.1: Create Flutter Project

```bash
# Create new Flutter project
flutter create --org com.talabin --project-name talabin_mobile talabin_mobile

cd talabin_mobile

# Test that it runs
flutter run
```

### Step 1.2: Add Dependencies

Edit `pubspec.yaml`:

```yaml
name: talabin_mobile
description: Talabin Digital Gold Trading Platform
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  # State Management
  provider: ^6.1.1

  # Networking
  dio: ^5.4.0
  pretty_dio_logger: ^1.3.1

  # Local Storage
  shared_preferences: ^2.2.2
  flutter_secure_storage: ^9.0.0
  hive: ^2.2.3
  hive_flutter: ^1.1.0

  # UI Components
  cached_network_image: ^3.3.1
  shimmer: ^3.0.0
  fl_chart: ^0.66.0

  # Utilities
  intl: ^0.19.0
  persian_number_utility: ^1.1.3
  get_it: ^7.6.4
  equatable: ^2.0.5

  # Persian/RTL Support
  flutter_localizations:
    sdk: flutter

  # Functional Programming
  dartz: ^0.10.1

  # Others
  connectivity_plus: ^5.0.2
  url_launcher: ^6.2.2
  share_plus: ^7.2.1
  permission_handler: ^11.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1
  build_runner: ^2.4.7
  hive_generator: ^2.0.1

flutter:
  uses-material-design: true

  assets:
    - assets/images/
    - assets/icons/

  fonts:
    - family: Vazir
      fonts:
        - asset: assets/fonts/Vazir-Regular.ttf
        - asset: assets/fonts/Vazir-Bold.ttf
          weight: 700
```

Run:
```bash
flutter pub get
```

### Step 1.3: Create Project Structure

```bash
mkdir -p lib/core/api
mkdir -p lib/core/constants
mkdir -p lib/core/errors
mkdir -p lib/core/network
mkdir -p lib/core/storage
mkdir -p lib/core/theme
mkdir -p lib/features/auth/data/datasources
mkdir -p lib/features/auth/data/models
mkdir -p lib/features/auth/data/repositories
mkdir -p lib/features/auth/domain/entities
mkdir -p lib/features/auth/domain/repositories
mkdir -p lib/features/auth/domain/usecases
mkdir -p lib/features/auth/presentation/pages
mkdir -p lib/features/auth/presentation/providers
mkdir -p lib/features/auth/presentation/widgets
mkdir -p lib/features/dashboard/data
mkdir -p lib/features/dashboard/domain
mkdir -p lib/features/dashboard/presentation
mkdir -p lib/features/wallet/data
mkdir -p lib/features/wallet/domain
mkdir -p lib/features/wallet/presentation
mkdir -p lib/features/trading/data
mkdir -p lib/features/trading/domain
mkdir -p lib/features/trading/presentation
mkdir -p lib/features/profile/data
mkdir -p lib/features/profile/domain
mkdir -p lib/features/profile/presentation
mkdir -p lib/shared/widgets
mkdir -p lib/shared/utils
mkdir -p assets/images
mkdir -p assets/icons
mkdir -p assets/fonts
```

### Step 1.4: Add Persian Fonts

Download Vazir or IRANSans fonts and place in `assets/fonts/`

### Step 1.5: Configure Constants

Create `lib/core/constants/api_constants.dart`:

```dart
class ApiConstants {
  static const String baseUrlDevelopment = 'http://10.0.2.2:8000/api/';
  static const String baseUrlProduction = 'https://api.talabin.com/api/';

  static const int connectTimeout = 30000;
  static const int receiveTimeout = 30000;

  // Endpoints
  static const String sendOtp = '/auth/send-otp/';
  static const String verifyOtp = '/auth/verify-otp/';
  static const String profile = '/auth/profile/';
  static const String walletBalance = '/wallet/balance/';
  static const String transactions = '/wallet/transactions/';
  static const String currentGoldPrice = '/prices/gold/current/';
  static const String goldPriceHistory = '/prices/gold/history/';
  static const String tradeOrders = '/trading/orders/';
}
```

Create `lib/core/constants/app_constants.dart`:

```dart
class AppConstants {
  static const String appName = 'طلابین';
  static const String appVersion = '1.0.0';

  // Storage Keys
  static const String accessTokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userIdKey = 'user_id';
  static const String isFirstLaunchKey = 'is_first_launch';

  // Hive Boxes
  static const String goldPriceBox = 'gold_prices';
  static const String walletBox = 'wallet_data';
  static const String transactionsBox = 'transactions';
}
```

---

## Phase 2: Core Infrastructure

### Step 2.1: Setup Dio HTTP Client

Create `lib/core/api/dio_client.dart`:

```dart
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import '../constants/api_constants.dart';
import '../constants/app_constants.dart';

class DioClient {
  late Dio _dio;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  DioClient() {
    _dio = Dio(
      BaseOptions(
        baseUrl: ApiConstants.baseUrlDevelopment,
        connectTimeout: Duration(milliseconds: ApiConstants.connectTimeout),
        receiveTimeout: Duration(milliseconds: ApiConstants.receiveTimeout),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': 'fa',
        },
      ),
    );

    _dio.interceptors.add(PrettyDioLogger(
      requestHeader: true,
      requestBody: true,
      responseBody: true,
      responseHeader: false,
      error: true,
      compact: true,
    ));

    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: _onRequest,
        onError: _onError,
      ),
    );
  }

  Future<void> _onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final token = await _storage.read(key: AppConstants.accessTokenKey);
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  Future<void> _onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) async {
    if (err.response?.statusCode == 401) {
      if (await _refreshToken()) {
        final opts = err.requestOptions;
        final token = await _storage.read(key: AppConstants.accessTokenKey);
        opts.headers['Authorization'] = 'Bearer $token';

        try {
          final response = await _dio.fetch(opts);
          handler.resolve(response);
          return;
        } catch (e) {
          handler.next(err);
        }
      }
    }
    handler.next(err);
  }

  Future<bool> _refreshToken() async {
    try {
      final refreshToken = await _storage.read(
        key: AppConstants.refreshTokenKey,
      );
      if (refreshToken == null) return false;

      final response = await _dio.post(
        '/auth/token/refresh/',
        data: {'refresh': refreshToken},
      );

      if (response.statusCode == 200) {
        final newAccessToken = response.data['access'];
        await _storage.write(
          key: AppConstants.accessTokenKey,
          value: newAccessToken,
        );
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Dio get dio => _dio;
}
```

### Step 2.2: Setup Error Handling

Create `lib/core/errors/failures.dart`:

```dart
import 'package:equatable/equatable.dart';

abstract class Failure extends Equatable {
  final String message;

  const Failure(this.message);

  @override
  List<Object> get props => [message];
}

class ServerFailure extends Failure {
  const ServerFailure(String message) : super(message);
}

class NetworkFailure extends Failure {
  const NetworkFailure() : super('خطا در اتصال به اینترنت');
}

class CacheFailure extends Failure {
  const CacheFailure() : super('خطا در ذخیره‌سازی داده');
}

class ValidationFailure extends Failure {
  const ValidationFailure(String message) : super(message);
}

class UnauthorizedFailure extends Failure {
  const UnauthorizedFailure() : super('لطفا دوباره وارد شوید');
}
```

### Step 2.3: Setup Dependency Injection

Create `lib/core/di/injection.dart`:

```dart
import 'package:get_it/get_it.dart';
import '../api/dio_client.dart';
import '../../features/auth/data/datasources/auth_remote_datasource.dart';
import '../../features/auth/data/repositories/auth_repository_impl.dart';
import '../../features/auth/domain/repositories/auth_repository.dart';

final sl = GetIt.instance;

Future<void> init() async {
  // Core
  sl.registerLazySingleton(() => DioClient());

  // Auth Feature
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSourceImpl(sl()),
  );

  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(sl()),
  );

  // Add other features...
}
```

### Step 2.4: Setup App Theme

Create `lib/core/theme/app_theme.dart`:

```dart
import 'package:flutter/material.dart';

class AppTheme {
  static const Color primaryColor = Color(0xFFD4AF37); // Gold
  static const Color backgroundColor = Color(0xFF0A0F1E); // Dark blue
  static const Color surfaceColor = Color(0xFF1A1F2E);
  static const Color errorColor = Color(0xFFEF4444);
  static const Color successColor = Color(0xFF10B981);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: primaryColor,
      scaffoldBackgroundColor: backgroundColor,
      colorScheme: const ColorScheme.dark(
        primary: primaryColor,
        surface: surfaceColor,
        error: errorColor,
      ),
      fontFamily: 'Vazir',
      appBarTheme: const AppBarTheme(
        backgroundColor: backgroundColor,
        elevation: 0,
        centerTitle: true,
      ),
      cardTheme: CardTheme(
        color: surfaceColor,
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.black,
          padding: const EdgeInsets.symmetric(vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
    );
  }
}
```

---

## Phase 3: Authentication Feature

### Step 3.1: Create Auth Domain Layer

`lib/features/auth/domain/entities/user.dart`:

```dart
import 'package:equatable/equatable.dart';

class User extends Equatable {
  final int id;
  final String phoneNumber;
  final String? firstName;
  final String? lastName;
  final String? email;
  final bool isVerified;

  const User({
    required this.id,
    required this.phoneNumber,
    this.firstName,
    this.lastName,
    this.email,
    this.isVerified = false,
  });

  @override
  List<Object?> get props => [
        id,
        phoneNumber,
        firstName,
        lastName,
        email,
        isVerified,
      ];
}
```

### Step 3.2: Create Auth Data Layer

`lib/features/auth/data/models/user_model.dart`:

```dart
import '../../domain/entities/user.dart';

class UserModel extends User {
  const UserModel({
    required int id,
    required String phoneNumber,
    String? firstName,
    String? lastName,
    String? email,
    bool isVerified = false,
  }) : super(
          id: id,
          phoneNumber: phoneNumber,
          firstName: firstName,
          lastName: lastName,
          email: email,
          isVerified: isVerified,
        );

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      phoneNumber: json['phone_number'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      email: json['email'],
      isVerified: json['is_verified'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'phone_number': phoneNumber,
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'is_verified': isVerified,
    };
  }
}
```

### Step 3.3: Create Auth Repository

`lib/features/auth/data/repositories/auth_repository_impl.dart`:

```dart
import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_datasource.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;

  AuthRepositoryImpl(this.remoteDataSource);

  @override
  Future<Either<Failure, void>> sendOtp(String phoneNumber) async {
    try {
      await remoteDataSource.sendOtp(phoneNumber);
      return const Right(null);
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, User>> verifyOtp(
    String phoneNumber,
    String otpCode,
  ) async {
    try {
      final user = await remoteDataSource.verifyOtp(phoneNumber, otpCode);
      return Right(user);
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }
}
```

### Step 3.4: Create Auth Presentation Layer

`lib/features/auth/presentation/providers/auth_provider.dart`:

```dart
import 'package:flutter/material.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/auth_repository.dart';

enum AuthStatus { initial, loading, authenticated, unauthenticated, error }

class AuthProvider extends ChangeNotifier {
  final AuthRepository _repository;

  AuthProvider(this._repository);

  AuthStatus _status = AuthStatus.initial;
  User? _user;
  String? _errorMessage;

  AuthStatus get status => _status;
  User? get user => _user;
  String? get errorMessage => _errorMessage;

  Future<void> sendOtp(String phoneNumber) async {
    _status = AuthStatus.loading;
    notifyListeners();

    final result = await _repository.sendOtp(phoneNumber);

    result.fold(
      (failure) {
        _status = AuthStatus.error;
        _errorMessage = failure.message;
        notifyListeners();
      },
      (_) {
        _status = AuthStatus.initial;
        notifyListeners();
      },
    );
  }

  Future<void> verifyOtp(String phoneNumber, String otpCode) async {
    _status = AuthStatus.loading;
    notifyListeners();

    final result = await _repository.verifyOtp(phoneNumber, otpCode);

    result.fold(
      (failure) {
        _status = AuthStatus.error;
        _errorMessage = failure.message;
        notifyListeners();
      },
      (user) {
        _user = user;
        _status = AuthStatus.authenticated;
        notifyListeners();
      },
    );
  }

  void logout() {
    _user = null;
    _status = AuthStatus.unauthenticated;
    notifyListeners();
  }
}
```

### Step 3.5: Create Login Screen

`lib/features/auth/presentation/pages/login_page.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import 'otp_verification_page.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _phoneController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Logo
                const Icon(
                  Icons.monetization_on,
                  size: 80,
                  color: Color(0xFFD4AF37),
                ),
                const SizedBox(height: 24),

                // Title
                const Text(
                  'ورود به طلابین',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 48),

                // Phone Input
                TextFormField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  textDirection: TextDirection.ltr,
                  decoration: const InputDecoration(
                    labelText: 'شماره موبایل',
                    hintText: '09123456789',
                    prefixIcon: Icon(Icons.phone),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'لطفا شماره موبایل را وارد کنید';
                    }
                    if (!RegExp(r'^09\d{9}$').hasMatch(value)) {
                      return 'شماره موبایل نامعتبر است';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 24),

                // Submit Button
                Consumer<AuthProvider>(
                  builder: (context, authProvider, child) {
                    return SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: authProvider.status == AuthStatus.loading
                            ? null
                            : _handleSendOtp,
                        child: authProvider.status == AuthStatus.loading
                            ? const CircularProgressIndicator()
                            : const Text('ارسال کد تایید'),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _handleSendOtp() async {
    if (_formKey.currentState!.validate()) {
      final authProvider = context.read<AuthProvider>();
      await authProvider.sendOtp('+98${_phoneController.text}');

      if (authProvider.status != AuthStatus.error) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => OtpVerificationPage(
              phoneNumber: '+98${_phoneController.text}',
            ),
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(authProvider.errorMessage ?? 'خطا')),
        );
      }
    }
  }

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }
}
```

### Step 3.6: Create OTP Verification Screen

Continue implementing OTP screen similar to login...

---

## Phase 4: Dashboard Feature

### Step 4.1: Create Dashboard Models & Repository
### Step 4.2: Create Dashboard Provider
### Step 4.3: Create Dashboard UI

Follow same pattern as Auth feature...

---

## Phase 5: Wallet Feature

### Step 5.1-5.3: Implement Wallet Module

Follow clean architecture pattern...

---

## Phase 6: Trading Feature

### Step 6.1-6.3: Implement Trading Module

---

## Phase 7: Polish & Testing

### Step 7.1: Add Loading States
### Step 7.2: Add Error Handling
### Step 7.3: Add Offline Support
### Step 7.4: Write Unit Tests
### Step 7.5: Write Widget Tests
### Step 7.6: Performance Optimization

---

## Phase 8: Build & Deploy

### Step 8.1: Android Build

```bash
# Build APK
flutter build apk --release

# Build App Bundle
flutter build appbundle --release
```

### Step 8.2: iOS Build

```bash
flutter build ios --release
```

### Step 8.3: Prepare for Store

- Create app icons
- Create screenshots
- Write app description
- Set up app signing

---

## Testing Commands

```bash
# Run all tests
flutter test

# Run with coverage
flutter test --coverage

# Run specific test
flutter test test/features/auth/auth_test.dart

# Run app in debug mode
flutter run

# Run app in release mode
flutter run --release
```

---

## Troubleshooting Common Issues

### Issue 1: Pub.dev Access
**Solution**: Check VPN, proxy settings, or use mirror

### Issue 2: Build Errors
**Solution**: Clean and rebuild
```bash
flutter clean
flutter pub get
flutter run
```

### Issue 3: Permission Errors
**Solution**: Update AndroidManifest.xml and Info.plist

---

## Next Actions After Network Issue Resolved

1. Create Flutter project
2. Add dependencies from this guide
3. Implement auth feature first
4. Test with backend API
5. Continue with other features
6. Polish and deploy

---

**Document Version**: 1.0
**Last Updated**: December 24, 2025
**Status**: Ready for Implementation
