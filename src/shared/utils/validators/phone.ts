/**
 * Phone number validation utilities for Iranian phone numbers
 */

import { toEnglishNumber } from '../formatters/number';

/**
 * Validate Iranian mobile phone number
 * @param phone - Phone number to validate
 * @returns true if valid, false otherwise
 * @example isValidIranianMobile("09123456789") => true
 */
export const isValidIranianMobile = (phone: string): boolean => {
  // Convert Persian digits to English
  const englishPhone = toEnglishNumber(phone.trim());

  // Remove spaces and dashes
  const cleanPhone = englishPhone.replace(/[\s-]/g, '');

  // Iranian mobile pattern: 09xxxxxxxxx (11 digits starting with 09)
  const mobilePattern = /^09[0-9]{9}$/;

  return mobilePattern.test(cleanPhone);
};

/**
 * Format Iranian phone number for display
 * @param phone - Phone number to format
 * @returns Formatted phone number
 * @example formatPhoneNumber("09123456789") => "0912 345 6789"
 */
export const formatPhoneNumber = (phone: string): string => {
  const englishPhone = toEnglishNumber(phone.trim());
  const cleanPhone = englishPhone.replace(/[\s-]/g, '');

  if (cleanPhone.length === 11 && cleanPhone.startsWith('09')) {
    return `${cleanPhone.slice(0, 4)} ${cleanPhone.slice(4, 7)} ${cleanPhone.slice(7)}`;
  }

  return phone;
};

/**
 * Normalize phone number to standard format (remove spaces, convert to English)
 * @param phone - Phone number to normalize
 * @returns Normalized phone number
 */
export const normalizePhoneNumber = (phone: string): string => {
  const englishPhone = toEnglishNumber(phone.trim());
  return englishPhone.replace(/[\s-]/g, '');
};
