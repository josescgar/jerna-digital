import { THEME_STORAGE_KEY, toggleTheme } from '@/features/theme/theme.utils';

const THEME_TOGGLE_ANIMATION_DURATION_MS = 250;
const THEME_TOGGLE_ANIMATION_FALLBACK_MS =
  THEME_TOGGLE_ANIMATION_DURATION_MS + 150;

const animationCleanupTimers = new WeakMap<HTMLElement, number>();
const animationCleanupControllers = new WeakMap<HTMLElement, AbortController>();

function clearThemeToggleAnimation(button: HTMLElement): void {
  const cleanupTimer = animationCleanupTimers.get(button);
  const cleanupController = animationCleanupControllers.get(button);

  if (cleanupTimer !== undefined) {
    window.clearTimeout(cleanupTimer);
    animationCleanupTimers.delete(button);
  }

  if (cleanupController !== undefined) {
    cleanupController.abort();
    animationCleanupControllers.delete(button);
  }

  button.classList.remove('is-animating');
}

function startThemeToggleAnimation(button: HTMLElement): void {
  clearThemeToggleAnimation(button);

  void button.offsetWidth;
  button.classList.add('is-animating');

  const cleanupController = new AbortController();
  const handleAnimationComplete = (): void => {
    clearThemeToggleAnimation(button);
  };

  button.addEventListener('animationend', handleAnimationComplete, {
    once: true,
    signal: cleanupController.signal,
  });
  button.addEventListener('animationcancel', handleAnimationComplete, {
    once: true,
    signal: cleanupController.signal,
  });

  const cleanupTimer = window.setTimeout(
    handleAnimationComplete,
    THEME_TOGGLE_ANIMATION_FALLBACK_MS
  );

  animationCleanupTimers.set(button, cleanupTimer);
  animationCleanupControllers.set(button, cleanupController);
}

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
  startThemeToggleAnimation(button);
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
