export type Theme = 'light' | 'dark';

export const themes = {
  light: 'Light',
  dark: 'Dark',
} as const;

export const defaultTheme: Theme = 'dark';
export const THEME_STORAGE_KEY = 'jerna-theme';

export function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark';
}

export function getStoredTheme(): Theme | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

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

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') {
    return defaultTheme;
  }

  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  } catch {
    return defaultTheme;
  }
}

export function getPreferredTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.setAttribute('data-theme', theme);
}

export function getCurrentTheme(): Theme {
  if (typeof document === 'undefined') {
    return defaultTheme;
  }

  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark';
}

export function getNextTheme(currentTheme: Theme): Theme {
  return currentTheme === 'light' ? 'dark' : 'light';
}

export function toggleTheme(): Theme {
  const newTheme = getNextTheme(getCurrentTheme());
  setStoredTheme(newTheme);
  applyTheme(newTheme);
  return newTheme;
}
