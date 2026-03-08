import { THEME_STORAGE_KEY, toggleTheme } from '@/features/theme/theme.utils';

declare global {
  interface Window {
    __jernaThemeToggleInitialized?: boolean;
  }
}

function handleThemeToggleClick(event: Event): void {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const button = target.closest('[data-theme-toggle]');
  if (!(button instanceof HTMLElement)) {
    return;
  }

  toggleTheme();
  button.classList.add('is-animating');
  button.addEventListener(
    'animationend',
    () => button.classList.remove('is-animating'),
    {
      once: true,
    }
  );
}

function handleSystemThemeChange(event: MediaQueryListEvent): void {
  try {
    if (localStorage.getItem(THEME_STORAGE_KEY)) {
      return;
    }
  } catch {
    return;
  }

  document.documentElement.setAttribute(
    'data-theme',
    event.matches ? 'light' : 'dark'
  );
}

function initThemeToggleClient(): void {
  if (typeof window === 'undefined' || window.__jernaThemeToggleInitialized) {
    return;
  }

  window.__jernaThemeToggleInitialized = true;
  document.addEventListener('click', handleThemeToggleClick);
  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', handleSystemThemeChange);
}

initThemeToggleClient();
