/**
 * Utility Helper Functions
 * Centralized helper functions used across the application
 */

/**
 * Convert English/Arabic numbers to Persian digits
 * @param num - Number or string to convert
 * @returns String with Persian digits
 */
export const toPersianNumber = (num: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

/**
 * Format currency amount for Persian display
 * @param amount - Amount to format
 * @returns Formatted Persian currency string
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("fa-IR");
};

/**
 * Format currency with Persian digits
 * @param amount - Amount to format
 * @returns Formatted amount with Persian digits
 */
export const formatCurrencyPersian = (amount: number): string => {
  return toPersianNumber(formatCurrency(amount));
};

/**
 * Format phone number to international format
 * @param phone - Phone number (e.g., "09123456789")
 * @returns Formatted phone (e.g., "+989123456789")
 */
export const formatPhoneNumber = (phone: string): string => {
  let cleaned = phone.trim();
  if (cleaned.startsWith('0')) {
    return '+98' + cleaned.substring(1);
  } else if (!cleaned.startsWith('+')) {
    return '+98' + cleaned;
  }
  return cleaned;
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format date to Persian short format
 * @param date - Date string or Date object
 * @returns Persian formatted date
 */
export const formatDatePersian = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
};

/**
 * Format date to Persian short format with time
 * @param date - Date string or Date object
 * @returns Persian formatted date with time
 */
export const formatDateTimePersian = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

/**
 * Calculate percentage
 * @param value - Current value
 * @param total - Total value
 * @returns Percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Sleep/delay function
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after ms
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 * @param value - Value to check
 * @returns True if empty
 */
export const isEmpty = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};
