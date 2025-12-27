/**
 * Application configuration
 */

export const appConfig = {
  /**
   * Application name
   */
  name: process.env.NEXT_PUBLIC_APP_NAME || 'طلابین',

  /**
   * Application URL
   */
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  /**
   * Environment
   */
  env: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',

  /**
   * Enable debug mode
   */
  debug: process.env.NODE_ENV === 'development',

  /**
   * Locale configuration
   */
  locale: {
    default: 'fa-IR',
    direction: 'rtl' as const,
    currency: 'IRR',
  },

  /**
   * Feature flags
   */
  features: {
    enableKYC: true,
    enableInstallments: true,
    enableGifts: true,
    enablePhysicalGold: true,
    enableSavings: true,
  },

  /**
   * Analytics configuration (if needed)
   */
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    // Add analytics IDs here
  },

  /**
   * Error reporting (e.g., Sentry)
   */
  errorReporting: {
    enabled: process.env.NODE_ENV === 'production',
    // Add Sentry DSN here
  },
} as const;

export type AppConfig = typeof appConfig;
