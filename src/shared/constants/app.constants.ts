/**
 * Application-wide constants
 */

export const APP_NAME = 'طلابین';
export const APP_NAME_ENGLISH = 'Talabin';
export const CURRENCY = 'IRR';
export const CURRENCY_SYMBOL = 'ریال';
export const DEFAULT_LOCALE = 'fa-IR';
export const DIRECTION = 'rtl' as const;

/**
 * Application routes
 */
export const ROUTES = {
  HOME: '/',

  // Auth routes
  LOGIN: '/login',
  LOGIN3: '/(auth)/login3',
  REGISTER: '/(auth)/register',
  VERIFY_OTP: '/verify-otp',
  VERIFY: '/(auth)/verify',
  FORGOT_PASSWORD: '/forgot-password',
  FORGOT_PASSWORD_VERIFY: '/forgot-password/verify',
  NEW_PASSWORD: '/forgot-password/new-password',

  // Dashboard routes
  DASHBOARD: '/dashboard',
  BUY_SELL: '/dashboard/buy-sell',
  WALLET: '/dashboard/wallet',
  WALLET_DEPOSIT: '/dashboard/wallet/deposit',
  WALLET_WITHDRAW: '/dashboard/wallet/withdraw',
  WALLET_HISTORY: '/dashboard/wallet/history',
  SAVINGS: '/dashboard/savings',
  SAVINGS_AUTO: '/dashboard/savings/auto-setup',
  INSTALLMENT: '/dashboard/installment',
  PHYSICAL_CHARGE: '/dashboard/physical-charge',
  PHYSICAL_RECEIPT: '/dashboard/physical-receipt',
  GIFT: '/dashboard/gift',
  SERVICES: '/dashboard/services',
  PRICES_GOLD: '/dashboard/prices/gold',

  // Profile routes
  PROFILE: '/profile',
  PROFILE_DETAILS: '/profile/details',
  PROFILE_PASSWORD: '/profile/password',
  PROFILE_CARDS: '/profile/cards',
  PROFILE_MESSAGES: '/profile/messages',
  PROFILE_HISTORY: '/profile/history',
  PROFILE_FAQ: '/profile/faq',
  PROFILE_SUPPORT: '/profile/support',
  PROFILE_TERMS: '/profile/terms',
  PROFILE_LICENSES: '/profile/licenses',
  PROFILE_VERIFICATION: '/profile/verification',

  // KYC
  KYC: '/kyc',

  // Payment
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_FAILURE: '/payment/failure',

  // Other
  ONBOARDING: '/onboarding',
} as const;

/**
 * Gold weight units
 */
export const GOLD_UNITS = {
  GRAM: 'گرم',
  GRAM_SYMBOL: 'g',
  MITHQAL: 'مثقال',
} as const;

/**
 * Transaction types
 */
export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  BUY: 'buy',
  SELL: 'sell',
  GIFT_SEND: 'gift_send',
  GIFT_RECEIVE: 'gift_receive',
  INSTALLMENT: 'installment',
  PHYSICAL_CHARGE: 'physical_charge',
  PHYSICAL_RECEIPT: 'physical_receipt',
} as const;

/**
 * Transaction status
 */
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

/**
 * Order types
 */
export const ORDER_TYPES = {
  BUY: 'buy',
  SELL: 'sell',
} as const;

/**
 * KYC status
 */
export const KYC_STATUS = {
  NOT_SUBMITTED: 'not_submitted',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

/**
 * File upload limits
 */
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
} as const;

/**
 * Validation constants
 */
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_NUMBER_LENGTH: 11,
  NATIONAL_ID_LENGTH: 10,
  OTP_LENGTH: 6,
} as const;

/**
 * Persian months (Jalali calendar)
 */
export const PERSIAN_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
] as const;

/**
 * Weekdays in Persian
 */
export const PERSIAN_WEEKDAYS = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
] as const;
