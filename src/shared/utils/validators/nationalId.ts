/**
 * Iranian National ID (کد ملی) validation utilities
 */

import { toEnglishNumber } from '../formatters/number';

/**
 * Validate Iranian National ID using checksum algorithm
 * @param nationalId - National ID to validate
 * @returns true if valid, false otherwise
 */
export const isValidNationalId = (nationalId: string): boolean => {
  // Convert Persian digits to English
  const englishId = toEnglishNumber(nationalId.trim());

  // Remove spaces and dashes
  const cleanId = englishId.replace(/[\s-]/g, '');

  // Must be exactly 10 digits
  if (!/^\d{10}$/.test(cleanId)) {
    return false;
  }

  // Check if all digits are the same (invalid)
  if (/^(\d)\1{9}$/.test(cleanId)) {
    return false;
  }

  // Validate checksum
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanId.charAt(i)) * (10 - i);
  }

  const remainder = sum % 11;
  const checkDigit = parseInt(cleanId.charAt(9));

  return (
    (remainder < 2 && checkDigit === remainder) ||
    (remainder >= 2 && checkDigit === 11 - remainder)
  );
};

/**
 * Format National ID for display
 * @param nationalId - National ID to format
 * @returns Formatted National ID
 * @example formatNationalId("1234567890") => "123-456789-0"
 */
export const formatNationalId = (nationalId: string): string => {
  const englishId = toEnglishNumber(nationalId.trim());
  const cleanId = englishId.replace(/[\s-]/g, '');

  if (cleanId.length === 10) {
    return `${cleanId.slice(0, 3)}-${cleanId.slice(3, 9)}-${cleanId.slice(9)}`;
  }

  return nationalId;
};
