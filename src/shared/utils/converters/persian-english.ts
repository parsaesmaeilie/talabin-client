/**
 * Converters for Persian/English text and numbers
 */

/**
 * Convert Arabic characters to Persian
 * @param text - Text to convert
 * @returns Text with Persian characters
 */
export const arabicToPersian = (text: string): string => {
  const arabicChars: { [key: string]: string } = {
    'ك': 'ک',
    'ي': 'ی',
    'ة': 'ه',
  };

  let result = text;
  Object.keys(arabicChars).forEach((arabic) => {
    result = result.replace(new RegExp(arabic, 'g'), arabicChars[arabic]);
  });

  return result;
};

/**
 * Normalize Persian text (convert Arabic to Persian, trim spaces)
 * @param text - Text to normalize
 * @returns Normalized text
 */
export const normalizePersianText = (text: string): string => {
  return arabicToPersian(text.trim());
};

/**
 * Check if text contains Persian characters
 * @param text - Text to check
 * @returns true if contains Persian characters
 */
export const hasPersianCharacters = (text: string): boolean => {
  const persianPattern = /[\u0600-\u06FF]/;
  return persianPattern.test(text);
};

/**
 * Check if text is RTL (Right-to-Left)
 * @param text - Text to check
 * @returns true if text should be RTL
 */
export const isRTL = (text: string): boolean => {
  return hasPersianCharacters(text);
};
