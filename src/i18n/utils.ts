/**
 * i18n utility functions for URL handling and language detection.
 */

import { type Route } from '@/lib/routes';
import {
  type Language,
  languages,
  defaultLanguage,
  localeMetadata,
} from './translations';

const languagePrefixRegex = new RegExp(
  `^/(${Object.keys(languages).join('|')})(?=/|$)`
);

/**
 * Storage key for persisted language preference.
 */
const LANGUAGE_STORAGE_KEY = 'jerna-lang';

/**
 * Get the localized path for a given language and path.
 * Default language stays at root (e.g., /about), other languages get prefixed
 * (e.g., /es/about).
 */
export function getLocalizedPath(lang: Language, path: Route | string): string {
  // Normalize path to start with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Remove any existing language prefix
  const stripped = normalizedPath.replace(languagePrefixRegex, '');
  const pathWithoutLang = stripped === '' ? '/' : stripped;

  if (lang === defaultLanguage) {
    return pathWithoutLang;
  }

  return pathWithoutLang === '/' ? `/${lang}` : `/${lang}${pathWithoutLang}`;
}

/**
 * Get alternate URLs for all languages given a path.
 * Used for hreflang tags in SEO.
 */
export function getAlternateUrls(
  currentPath: string,
  siteUrl: URL | string
): { lang: Language; hreflang: string; url: string }[] {
  const baseUrl = typeof siteUrl === 'string' ? siteUrl : siteUrl.origin;

  // Remove any existing language prefix from the path
  const stripped = currentPath.replace(languagePrefixRegex, '');
  const cleanPath = stripped === '' ? '/' : stripped;

  return (Object.keys(languages) as Language[]).map((lang) => {
    const localizedPath = getLocalizedPath(lang, cleanPath);
    return {
      lang,
      hreflang: localeMetadata[lang].hreflang,
      url: `${baseUrl}${localizedPath}`,
    };
  });
}

/**
 * Detect the user's preferred language from browser settings.
 * Returns the best matching supported language or the default.
 */
export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return defaultLanguage;
  }

  const browserLanguages = navigator.languages || [navigator.language];

  for (const browserLang of browserLanguages) {
    // Check for exact match (e.g., 'en-US' -> 'en')
    const langCode = browserLang.split('-')[0]?.toLowerCase();
    if (langCode && langCode in languages) {
      return langCode as Language;
    }
  }

  return defaultLanguage;
}

/**
 * Get the stored language preference from localStorage.
 * Returns null if no preference is stored or if running on the server.
 */
export function getStoredLanguage(): Language | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && stored in languages) {
      return stored as Language;
    }
  } catch {
    // localStorage might be blocked
  }

  return null;
}

/**
 * Store the language preference in localStorage.
 */
export function setStoredLanguage(lang: Language): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // localStorage might be blocked
  }
}

/**
 * Get the preferred language, checking stored preference first,
 * then browser settings, falling back to default.
 */
export function getPreferredLanguage(): Language {
  return getStoredLanguage() ?? detectBrowserLanguage();
}

/**
 * Switch to a different language by updating localStorage and navigating.
 * This is meant to be called from client-side JavaScript.
 */
export function switchLanguage(newLang: Language, currentPath: string): string {
  setStoredLanguage(newLang);
  return getLocalizedPath(newLang, currentPath);
}
