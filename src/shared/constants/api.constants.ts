/**
 * API-related constants
 */

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    LOGOUT: '/auth/logout/',
    SEND_OTP: '/auth/send-otp/',
    VERIFY_OTP: '/auth/verify-otp/',
    REFRESH_TOKEN: '/auth/token/refresh/',
    CHANGE_PASSWORD: '/auth/change-password/',
    RESET_PASSWORD: '/auth/reset-password/',
    ME: '/auth/me/',
  },

  // Wallet endpoints
  WALLET: {
    BALANCE: '/wallet/balance/',
    TRANSACTIONS: '/wallet/transactions/',
    DEPOSIT: '/wallet/deposit/',
    WITHDRAW: '/wallet/withdraw/',
    BANK_ACCOUNTS: '/wallet/bank-accounts/',
  },

  // Trading endpoints
  TRADING: {
    BUY: '/trading/buy/',
    SELL: '/trading/sell/',
    ORDERS: '/trading/orders/',
    ORDER_PREVIEW: '/trading/preview/',
  },

  // Prices endpoints
  PRICES: {
    CURRENT: '/prices/current/',
    HISTORY: '/prices/history/',
    GOLD: '/prices/gold/',
  },

  // KYC endpoints
  KYC: {
    STATUS: '/kyc/status/',
    SUBMIT: '/kyc/submit/',
    UPLOAD_DOCUMENT: '/kyc/upload-document/',
    UPLOAD_SELFIE: '/kyc/upload-selfie/',
  },

  // Profile endpoints
  PROFILE: {
    GET: '/profile/',
    UPDATE: '/profile/update/',
    CARDS: '/profile/cards/',
    MESSAGES: '/profile/messages/',
  },

  // Installments endpoints
  INSTALLMENTS: {
    LIST: '/installments/',
    CREATE: '/installments/create/',
    DETAIL: '/installments/:id/',
    PAYMENTS: '/installments/:id/payments/',
  },
} as const;

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * API error messages (Persian)
 */
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'خطا در ارتباط با سرور',
  UNAUTHORIZED: 'لطفا وارد حساب کاربری خود شوید',
  FORBIDDEN: 'شما اجازه دسترسی به این بخش را ندارید',
  NOT_FOUND: 'اطلاعات مورد نظر یافت نشد',
  SERVER_ERROR: 'خطای سرور. لطفا بعدا تلاش کنید',
  VALIDATION_ERROR: 'اطلاعات وارد شده صحیح نیست',
  TIMEOUT: 'زمان درخواست به پایان رسید',
} as const;

/**
 * Request timeout in milliseconds
 */
export const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Retry configuration
 */
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],
} as const;
