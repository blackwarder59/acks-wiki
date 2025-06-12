/**
 * Utility Functions for ACKS II Wiki
 * 
 * This file contains common utility functions used throughout the application,
 * including class name merging, type guards, formatting, and other helpers.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge for optimal CSS handling.
 * This is the standard way to combine class names in the application.
 * 
 * @param inputs - Class names to merge (strings, conditionals, arrays, etc.)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * ```typescript
 * cn('base-class', condition && 'conditional-class', 'override-class')
 * cn(['array', 'of', 'classes'], { 'conditional': isActive })
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type guard to check if a value is defined (not null or undefined)
 * 
 * @param value - Value to check
 * @returns True if value is defined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard to check if a value is a non-empty string
 * 
 * @param value - Value to check
 * @returns True if value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

/**
 * Type guard to check if a value is a valid number
 * 
 * @param value - Value to check
 * @returns True if value is a valid number (not NaN or Infinity)
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Capitalizes the first letter of a string
 * 
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats a string to title case (capitalizes each word)
 * 
 * @param str - String to format
 * @returns Title case string
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Truncates a string to a specified length with ellipsis
 * 
 * @param str - String to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to append (default: '...')
 * @returns Truncated string
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Debounces a function call
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttles a function call
 * 
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Safely parses JSON with error handling
 * 
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Generates a random ID string
 * 
 * @param length - Length of the ID (default: 8)
 * @returns Random ID string
 */
export function generateId(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Formats a number with thousand separators
 * 
 * @param num - Number to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Formats a date to a human-readable string
 * 
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Creates a delay promise for async operations
 * 
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Removes duplicates from an array
 * 
 * @param array - Array to deduplicate
 * @param key - Optional key function for complex objects
 * @returns Array without duplicates
 */
export function unique<T>(array: T[], key?: (item: T) => any): T[] {
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const k = key(item);
    if (seen.has(k)) {
      return false;
    }
    seen.add(k);
    return true;
  });
}

/**
 * Groups an array by a key function
 * 
 * @param array - Array to group
 * @param key - Key function
 * @returns Grouped object
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const k = key(item);
    if (!groups[k]) {
      groups[k] = [];
    }
    groups[k].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

/**
 * Sorts an array by multiple criteria
 * 
 * @param array - Array to sort
 * @param sorters - Array of sort functions
 * @returns Sorted array
 */
export function sortBy<T>(
  array: T[],
  ...sorters: Array<(item: T) => any>
): T[] {
  return [...array].sort((a, b) => {
    for (const sorter of sorters) {
      const aVal = sorter(a);
      const bVal = sorter(b);
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
    }
    return 0;
  });
} 