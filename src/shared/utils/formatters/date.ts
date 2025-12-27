/**
 * Date formatting utilities for Persian/Jalali calendar
 */

import { toPersianNumber } from './number';

/**
 * Format date to Persian date string
 * Note: For full Jalali calendar support, consider using a library like 'jalali-moment' or 'date-fns-jalali'
 * This is a basic implementation using Intl.DateTimeFormat
 */

/**
 * Format date to Persian locale string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string with Persian digits
 */
export const formatDate = (
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  const formatted = new Intl.DateTimeFormat('fa-IR', defaultOptions).format(dateObj);
  return toPersianNumber(formatted);
};

/**
 * Format date and time to Persian string
 * @param date - Date to format
 * @returns Formatted date and time string
 * @example formatDateTime(new Date()) => "۱۴۰۳/۱۰/۰۷ - ۱۴:۳۰"
 */
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const datePart = formatDate(dateObj, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const timePart = formatTime(dateObj);

  return `${datePart} - ${timePart}`;
};

/**
 * Format time to Persian string
 * @param date - Date to format
 * @returns Formatted time string
 * @example formatTime(new Date()) => "۱۴:۳۰"
 */
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  return toPersianNumber(`${hours}:${minutes}`);
};

/**
 * Get relative time string in Persian
 * @param date - Date to compare
 * @returns Relative time string
 * @example getRelativeTime(yesterday) => "دیروز"
 */
export const getRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'همین الان';
  if (diffInMinutes < 60) return `${toPersianNumber(diffInMinutes)} دقیقه پیش`;
  if (diffInHours < 24) return `${toPersianNumber(diffInHours)} ساعت پیش`;
  if (diffInDays < 7) return `${toPersianNumber(diffInDays)} روز پیش`;

  return formatDate(dateObj);
};

/**
 * Format transaction date (short format)
 * @param date - Date to format
 * @returns Short formatted date
 */
export const formatTransactionDate = (date: Date | string): string => {
  return formatDate(date, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
