/**
 * Number formatting utilities for Persian/Farsi locale
 */

/**
 * Convert English digits to Persian digits
 * @param num - Number or string to convert
 * @returns String with Persian digits
 * @example toPersianNumber(123) => "۱۲۳"
 */
export const toPersianNumber = (num: string | number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

/**
 * Convert Persian digits to English digits
 * @param str - String with Persian digits
 * @returns String with English digits
 * @example toEnglishNumber("۱۲۳") => "123"
 */
export const toEnglishNumber = (str: string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let result = str;
  persianDigits.forEach((persian, index) => {
    result = result.replace(new RegExp(persian, 'g'), englishDigits[index]);
  });

  return result;
};

/**
 * Format number as currency in Iranian Rial with Persian digits
 * @param amount - Amount to format
 * @param showCurrency - Whether to show currency symbol
 * @returns Formatted currency string
 * @example formatCurrency(1000000) => "۱,۰۰۰,۰۰۰ ریال"
 */
export const formatCurrency = (
  amount: number,
  showCurrency: boolean = true
): string => {
  const formatted = new Intl.NumberFormat('fa-IR').format(amount);
  const persian = toPersianNumber(formatted);
  return showCurrency ? `${persian} ریال` : persian;
};

/**
 * Format gold weight in grams with Persian digits
 * @param grams - Weight in grams
 * @param precision - Decimal places (default: 3)
 * @returns Formatted weight string
 * @example formatGoldWeight(1.234) => "۱.۲۳۴ گرم"
 */
export const formatGoldWeight = (
  grams: number,
  precision: number = 3
): string => {
  const formatted = grams.toFixed(precision);
  const persian = toPersianNumber(formatted);
  return `${persian} گرم`;
};

/**
 * Format number as percentage with Persian digits
 * @param value - Value to format (0-100)
 * @param precision - Decimal places (default: 1)
 * @returns Formatted percentage string
 * @example formatPercentage(12.5) => "۱۲.۵٪"
 */
export const formatPercentage = (
  value: number,
  precision: number = 1
): string => {
  const formatted = value.toFixed(precision);
  const persian = toPersianNumber(formatted);
  return `${persian}٪`;
};

/**
 * Format large numbers in compact form (K, M, B)
 * @param num - Number to format
 * @returns Compacted number string
 * @example formatCompact(1500000) => "۱.۵ میلیون"
 */
export const formatCompact = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${toPersianNumber((num / 1_000_000_000).toFixed(1))} میلیارد`;
  }
  if (num >= 1_000_000) {
    return `${toPersianNumber((num / 1_000_000).toFixed(1))} میلیون`;
  }
  if (num >= 1_000) {
    return `${toPersianNumber((num / 1_000).toFixed(1))} هزار`;
  }
  return toPersianNumber(num);
};

/**
 * Parse Persian/English number string to number
 * @param str - Number string
 * @returns Parsed number
 * @example parseNumber("۱۲۳") => 123
 */
export const parseNumber = (str: string): number => {
  const english = toEnglishNumber(str);
  return parseFloat(english.replace(/,/g, ''));
};
