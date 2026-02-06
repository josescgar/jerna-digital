/**
 * Theme utility functions for light/dark mode support.
 * Architecture mirrors src/i18n/utils.ts for consistency.
 */

export type Theme = 'light' | 'dark';

export const themes = {
  light: 'Light',
  dark: 'Dark',
} as const;

export const defaultTheme: Theme = 'dark';

/**
 * Storage key for persisted theme preference.
 */
const THEME_STORAGE_KEY = 'jerna-theme';

/**
 * Get the stored theme preference from localStorage.
 * Returns null if no preference is stored or if running on the server.
 */
export function getStoredTheme(): Theme | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage might be blocked
  }

  return null;
}

/**
 * Store the theme preference in localStorage.
 */
export function setStoredTheme(theme: Theme): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage might be blocked
  }
}

/**
 * Get the system's preferred color scheme.
 * Returns the default theme if running on the server or if preference can't be detected.
 */
export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') {
    return defaultTheme;
  }

  try {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // matchMedia might not be available
  }

  return defaultTheme;
}

/**
 * Get the preferred theme, checking stored preference first,
 * then system preference, falling back to default.
 */
export function getPreferredTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

/**
 * Apply a theme to the document.
 * Sets the data-theme attribute on the html element.
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Toggle between light and dark themes.
 * Returns the new theme.
 */
export function toggleTheme(): Theme {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') === 'light'
      ? 'light'
      : 'dark';
  const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';

  setStoredTheme(newTheme);
  applyTheme(newTheme);

  return newTheme;
}
