import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge.
 * This utility combines multiple class values and intelligently
 * merges Tailwind CSS classes to avoid conflicts.
 *
 * @param inputs - Class values to merge (strings, arrays, objects)
 * @returns Merged class string
 *
 * @example
 * cn('px-4 py-2', 'bg-primary', condition && 'text-white')
 * cn('p-4', { 'bg-red': isError, 'bg-green': isSuccess })
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string for display.
 *
 * @param date - Date string or Date object
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generates a unique ID for component instances.
 * Uses a simple counter approach suitable for SSG.
 *
 * @param prefix - Optional prefix for the ID
 * @returns Unique string ID
 */
let idCounter = 0;
export function generateId(prefix: string = 'id'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Debounces a function call.
 *
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
