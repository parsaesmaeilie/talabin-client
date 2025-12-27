/**
 * API configuration
 */

export const apiConfig = {
  /**
   * Base API URL
   */
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',

  /**
   * Request timeout in milliseconds
   */
  timeout: 30000,

  /**
   * Enable request/response logging
   */
  enableLogging: process.env.NODE_ENV === 'development',

  /**
   * Retry configuration
   */
  retry: {
    enabled: true,
    maxRetries: 3,
    retryDelay: 1000,
    retryStatusCodes: [408, 429, 500, 502, 503, 504],
  },

  /**
   * Headers to include in all requests
   */
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

export type ApiConfig = typeof apiConfig;
