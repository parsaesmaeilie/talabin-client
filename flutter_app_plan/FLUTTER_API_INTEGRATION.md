# Talabin Mobile - API Integration Guide

## Overview
This document provides detailed information about integrating the Flutter mobile app with the Talabin Django REST API backend.

## API Base Configuration

### Environment URLs
```dart
// lib/core/api/api_config.dart
class ApiConfig {
  static const String baseUrlDevelopment = 'http://10.0.2.2:8000/api/';  // Android Emulator
  static const String baseUrlDevelopmentIOS = 'http://localhost:8000/api/'; // iOS Simulator
  static const String baseUrlProduction = 'https://api.talabin.com/api/';

  static String get baseUrl {
    return kReleaseMode ? baseUrlProduction :
           Platform.isAndroid ? baseUrlDevelopment : baseUrlDevelopmentIOS;
  }
}
```

### HTTP Client Setup (Dio)

```dart
// lib/core/api/dio_client.dart
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class DioClient {
  late Dio _dio;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  DioClient() {
    _dio = Dio(
      BaseOptions(
        baseUrl: ApiConfig.baseUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': 'fa',
        },
      ),
    );

    _dio.interceptors.add(LogInterceptor(
      request: true,
      requestBody: true,
      responseBody: true,
      error: true,
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: _onRequest,
      onError: _onError,
    ));
  }

  Future<void> _onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final token = await _storage.read(key: 'access_token');
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
      // Token expired, try to refresh
      if (await _refreshToken()) {
        // Retry the request
        final opts = err.requestOptions;
        final token = await _storage.read(key: 'access_token');
        opts.headers['Authorization'] = 'Bearer $token';

        try {
          final response = await _dio.fetch(opts);
          handler.resolve(response);
          return;
        } catch (e) {
          // Refresh failed, logout user
          handler.next(err);
        }
      }
    }
    handler.next(err);
  }

  Future<bool> _refreshToken() async {
    try {
      final refreshToken = await _storage.read(key: 'refresh_token');
      if (refreshToken == null) return false;

      final response = await _dio.post(
        '/auth/token/refresh/',
        data: {'refresh': refreshToken},
      );

      if (response.statusCode == 200) {
        final newAccessToken = response.data['access'];
        await _storage.write(key: 'access_token', value: newAccessToken);
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

## API Response Models

### Standard API Response
```dart
class ApiResponse<T> {
  final bool success;
  final String? message;
  final T? data;
  final ApiError? error;

  ApiResponse({
    required this.success,
    this.message,
    this.data,
    this.error,
  });

  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(Map<String, dynamic>)? fromJsonT,
  ) {
    return ApiResponse<T>(
      success: json['success'] ?? false,
      message: json['message'],
      data: json['data'] != null && fromJsonT != null
          ? fromJsonT(json['data'])
          : json['data'],
      error: json['error'] != null
          ? ApiError.fromJson(json['error'])
          : null,
    );
  }
}

class ApiError {
  final String message;
  final Map<String, dynamic>? details;

  ApiError({required this.message, this.details});

  factory ApiError.fromJson(Map<String, dynamic> json) {
    return ApiError(
      message: json['message'] ?? 'Unknown error',
      details: json['details'],
    );
  }
}
```

## Authentication APIs

### 1. Send OTP
```dart
// POST /auth/send-otp/
class AuthRepository {
  final DioClient _dioClient;

  AuthRepository(this._dioClient);

  Future<ApiResponse<Map<String, dynamic>>> sendOtp(String phoneNumber) async {
    try {
      final response = await _dioClient.dio.post(
        '/auth/send-otp/',
        data: {'phone_number': phoneNumber},
      );

      return ApiResponse.fromJson(response.data, null);
    } on DioException catch (e) {
      return ApiResponse(
        success: false,
        error: ApiError(
          message: e.response?.data['error']?['message'] ?? 'خطا در ارسال کد',
        ),
      );
    }
  }
}
```

**Request**:
```json
{
  "phone_number": "+989121234567"
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "کد تایید برای شما ارسال شد",
  "data": {
    "expires_in": 300
  }
}
```

### 2. Verify OTP & Login
```dart
// POST /auth/verify-otp/
Future<ApiResponse<AuthData>> verifyOtp(
  String phoneNumber,
  String otpCode,
) async {
  try {
    final response = await _dioClient.dio.post(
      '/auth/verify-otp/',
      data: {
        'phone_number': phoneNumber,
        'otp_code': otpCode,
      },
    );

    final authData = AuthData.fromJson(response.data['data']);

    // Save tokens
    await _storage.write(key: 'access_token', value: authData.accessToken);
    await _storage.write(key: 'refresh_token', value: authData.refreshToken);

    return ApiResponse(
      success: true,
      data: authData,
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(
        message: e.response?.data['error']?['message'] ?? 'کد تایید نامعتبر است',
      ),
    );
  }
}
```

**Request**:
```json
{
  "phone_number": "+989121234567",
  "otp_code": "123456"
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "ورود موفقیت‌آمیز",
  "data": {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "phone_number": "+989121234567",
      "first_name": "علی",
      "last_name": "محمدی",
      "is_verified": true
    }
  }
}
```

### 3. Get User Profile
```dart
// GET /auth/profile/
Future<ApiResponse<User>> getProfile() async {
  try {
    final response = await _dioClient.dio.get('/auth/profile/');

    return ApiResponse(
      success: true,
      data: User.fromJson(response.data['data']),
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در دریافت اطلاعات کاربر'),
    );
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "phone_number": "+989121234567",
    "first_name": "علی",
    "last_name": "محمدی",
    "email": "ali@example.com",
    "national_code": "1234567890",
    "is_verified": true,
    "created_at": "2025-01-01T10:00:00Z"
  }
}
```

### 4. Update Profile
```dart
// PUT /auth/profile/
Future<ApiResponse<User>> updateProfile({
  String? firstName,
  String? lastName,
  String? email,
  String? nationalCode,
}) async {
  try {
    final response = await _dioClient.dio.put(
      '/auth/profile/',
      data: {
        if (firstName != null) 'first_name': firstName,
        if (lastName != null) 'last_name': lastName,
        if (email != null) 'email': email,
        if (nationalCode != null) 'national_code': nationalCode,
      },
    );

    return ApiResponse(
      success: true,
      data: User.fromJson(response.data['data']),
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در بروزرسانی اطلاعات'),
    );
  }
}
```

## Wallet APIs

### 1. Get Wallet Balance
```dart
// GET /wallet/balance/
Future<ApiResponse<Wallet>> getWalletBalance() async {
  try {
    final response = await _dioClient.dio.get('/wallet/balance/');

    return ApiResponse(
      success: true,
      data: Wallet.fromJson(response.data['data']),
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در دریافت موجودی کیف پول'),
    );
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "irr_balance": "5000000.00",
    "gold_balance": "1.500",
    "total_value": "8500000.00"
  }
}
```

### 2. Get Transactions
```dart
// GET /wallet/transactions/
Future<ApiResponse<List<Transaction>>> getTransactions({
  String? type,
  int page = 1,
  int pageSize = 20,
}) async {
  try {
    final response = await _dioClient.dio.get(
      '/wallet/transactions/',
      queryParameters: {
        if (type != null) 'type': type,
        'page': page,
        'page_size': pageSize,
      },
    );

    final transactions = (response.data['data']['results'] as List)
        .map((json) => Transaction.fromJson(json))
        .toList();

    return ApiResponse(
      success: true,
      data: transactions,
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در دریافت تراکنش‌ها'),
    );
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "count": 50,
    "next": "/wallet/transactions/?page=2",
    "previous": null,
    "results": [
      {
        "id": 1,
        "type": "DEPOSIT",
        "amount": "1000000.00",
        "currency": "IRR",
        "status": "COMPLETED",
        "description": "واریز به کیف پول",
        "created_at": "2025-01-15T10:30:00Z"
      }
    ]
  }
}
```

### 3. Create Deposit Request
```dart
// POST /wallet/deposit/
Future<ApiResponse<DepositRequest>> createDeposit(double amount) async {
  try {
    final response = await _dioClient.dio.post(
      '/wallet/deposit/',
      data: {'amount': amount.toString()},
    );

    return ApiResponse(
      success: true,
      data: DepositRequest.fromJson(response.data['data']),
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در ایجاد درخواست واریز'),
    );
  }
}
```

### 4. Create Withdrawal Request
```dart
// POST /wallet/withdraw/
Future<ApiResponse<WithdrawalRequest>> createWithdrawal({
  required double amount,
  required int bankAccountId,
}) async {
  try {
    final response = await _dioClient.dio.post(
      '/wallet/withdraw/',
      data: {
        'amount': amount.toString(),
        'bank_account_id': bankAccountId,
      },
    );

    return ApiResponse(
      success: true,
      data: WithdrawalRequest.fromJson(response.data['data']),
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در ایجاد درخواست برداشت'),
    );
  }
}
```

## Gold Price APIs

### 1. Get Current Gold Price
```dart
// GET /prices/gold/current/
Future<ApiResponse<GoldPrice>> getCurrentGoldPrice() async {
  try {
    final response = await _dioClient.dio.get('/prices/gold/current/');

    return ApiResponse(
      success: true,
      data: GoldPrice.fromJson(response.data['data']),
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در دریافت قیمت طلا'),
    );
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "buy_price": "2350000.00",
    "sell_price": "2340000.00",
    "timestamp": "2025-01-15T12:00:00Z",
    "change_24h": 2.5,
    "high_24h": "2360000.00",
    "low_24h": "2320000.00"
  }
}
```

### 2. Get Gold Price History
```dart
// GET /prices/gold/history/
Future<ApiResponse<List<GoldPrice>>> getGoldPriceHistory({
  DateTime? startDate,
  DateTime? endDate,
  String period = '7d',  // 1d, 7d, 30d, 1y
}) async {
  try {
    final response = await _dioClient.dio.get(
      '/prices/gold/history/',
      queryParameters: {
        if (startDate != null) 'start_date': startDate.toIso8601String(),
        if (endDate != null) 'end_date': endDate.toIso8601String(),
        'period': period,
      },
    );

    final prices = (response.data['data'] as List)
        .map((json) => GoldPrice.fromJson(json))
        .toList();

    return ApiResponse(
      success: true,
      data: prices,
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در دریافت سابقه قیمت'),
    );
  }
}
```

## Trading APIs

### 1. Place Order (Buy/Sell)
```dart
// POST /trading/orders/
Future<ApiResponse<TradeOrder>> placeOrder({
  required String orderType,  // BUY or SELL
  required double amount,     // Amount in grams
}) async {
  try {
    final response = await _dioClient.dio.post(
      '/trading/orders/',
      data: {
        'order_type': orderType,
        'amount': amount.toString(),
      },
    );

    return ApiResponse(
      success: true,
      data: TradeOrder.fromJson(response.data['data']),
      message: response.data['message'],
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(
        message: e.response?.data['error']?['message'] ?? 'خطا در ثبت سفارش',
      ),
    );
  }
}
```

**Request** (Buy):
```json
{
  "order_type": "BUY",
  "amount": "0.5"
}
```

**Response**:
```json
{
  "success": true,
  "message": "سفارش با موفقیت ثبت شد",
  "data": {
    "id": 123,
    "order_type": "BUY",
    "amount": "0.500",
    "price": "2350000.00",
    "total_price": "1175000.00",
    "status": "COMPLETED",
    "created_at": "2025-01-15T14:30:00Z"
  }
}
```

### 2. Get Order History
```dart
// GET /trading/orders/
Future<ApiResponse<List<TradeOrder>>> getOrderHistory({
  String? orderType,
  int page = 1,
}) async {
  try {
    final response = await _dioClient.dio.get(
      '/trading/orders/',
      queryParameters: {
        if (orderType != null) 'order_type': orderType,
        'page': page,
        'page_size': 20,
      },
    );

    final orders = (response.data['data']['results'] as List)
        .map((json) => TradeOrder.fromJson(json))
        .toList();

    return ApiResponse(
      success: true,
      data: orders,
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در دریافت سفارشات'),
    );
  }
}
```

## Bank Account APIs

### 1. Get Bank Accounts
```dart
// GET /wallet/bank-accounts/
Future<ApiResponse<List<BankAccount>>> getBankAccounts() async {
  try {
    final response = await _dioClient.dio.get('/wallet/bank-accounts/');

    final accounts = (response.data['data'] as List)
        .map((json) => BankAccount.fromJson(json))
        .toList();

    return ApiResponse(
      success: true,
      data: accounts,
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در دریافت حساب‌های بانکی'),
    );
  }
}
```

### 2. Add Bank Account
```dart
// POST /wallet/bank-accounts/
Future<ApiResponse<BankAccount>> addBankAccount({
  required String accountNumber,
  required String accountHolder,
  required String bankName,
  String? iban,
}) async {
  try {
    final response = await _dioClient.dio.post(
      '/wallet/bank-accounts/',
      data: {
        'account_number': accountNumber,
        'account_holder': accountHolder,
        'bank_name': bankName,
        if (iban != null) 'iban': iban,
      },
    );

    return ApiResponse(
      success: true,
      data: BankAccount.fromJson(response.data['data']),
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در افزودن حساب بانکی'),
    );
  }
}
```

## Installment APIs

### 1. Get Available Plans
```dart
// GET /installments/plans/
Future<ApiResponse<List<InstallmentPlan>>> getInstallmentPlans() async {
  try {
    final response = await _dioClient.dio.get('/installments/plans/');

    final plans = (response.data['data'] as List)
        .map((json) => InstallmentPlan.fromJson(json))
        .toList();

    return ApiResponse(
      success: true,
      data: plans,
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در دریافت طرح‌های اقساطی'),
    );
  }
}
```

### 2. Subscribe to Plan
```dart
// POST /installments/subscriptions/
Future<ApiResponse<InstallmentSubscription>> subscribeToInstallment({
  required int planId,
}) async {
  try {
    final response = await _dioClient.dio.post(
      '/installments/subscriptions/',
      data: {'plan_id': planId},
    );

    return ApiResponse(
      success: true,
      data: InstallmentSubscription.fromJson(response.data['data']),
    );
  } on DioException catch (e) {
    return ApiResponse(
      success: false,
      error: ApiError(message: 'خطا در ثبت‌نام در طرح اقساطی'),
    );
  }
}
```

## Error Handling

### Error Types
```dart
enum ApiErrorType {
  networkError,
  serverError,
  unauthorized,
  validationError,
  notFound,
  unknown,
}

class AppException implements Exception {
  final String message;
  final ApiErrorType type;

  AppException(this.message, this.type);

  factory AppException.fromDioError(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return AppException('خطا در اتصال به سرور', ApiErrorType.networkError);

      case DioExceptionType.badResponse:
        if (error.response?.statusCode == 401) {
          return AppException('لطفا دوباره وارد شوید', ApiErrorType.unauthorized);
        } else if (error.response?.statusCode == 404) {
          return AppException('اطلاعات یافت نشد', ApiErrorType.notFound);
        } else if (error.response?.statusCode == 400) {
          return AppException(
            error.response?.data['error']?['message'] ?? 'داده‌های نامعتبر',
            ApiErrorType.validationError,
          );
        }
        return AppException('خطای سرور', ApiErrorType.serverError);

      default:
        return AppException('خطای ناشناخته', ApiErrorType.unknown);
    }
  }
}
```

## Caching Strategy

### Cache Implementation
```dart
// Using Hive for local caching
class CacheManager {
  static const String goldPriceBox = 'gold_prices';
  static const String walletBox = 'wallet_data';
  static const String transactionsBox = 'transactions';

  Future<void> cacheGoldPrice(GoldPrice price) async {
    final box = await Hive.openBox<GoldPrice>(goldPriceBox);
    await box.put('latest', price);
  }

  Future<GoldPrice?> getCachedGoldPrice() async {
    final box = await Hive.openBox<GoldPrice>(goldPriceBox);
    return box.get('latest');
  }

  Future<void> cacheWallet(Wallet wallet) async {
    final box = await Hive.openBox<Wallet>(walletBox);
    await box.put('current', wallet);
  }

  Future<Wallet?> getCachedWallet() async {
    final box = await Hive.openBox<Wallet>(walletBox);
    return box.get('current');
  }
}
```

## Testing API Calls

### Mock Data for Testing
```dart
class MockApiClient {
  Future<ApiResponse<GoldPrice>> getCurrentGoldPrice() async {
    await Future.delayed(const Duration(seconds: 1));
    return ApiResponse(
      success: true,
      data: GoldPrice(
        id: 1,
        buyPrice: 2350000,
        sellPrice: 2340000,
        timestamp: DateTime.now(),
        change24h: 2.5,
      ),
    );
  }
}
```

---

**Document Version**: 1.0
**Last Updated**: December 24, 2025
**Status**: Complete
