import { type Route } from '@/features/common/routes.utils';
import {
  type Language,
  languages,
  defaultLanguage,
  localeMetadata,
} from '@/features/i18n/i18n.translations';

const languagePrefixRegex = new RegExp(
  `^/(${Object.keys(languages).join('|')})(?=/|$)`
);

export const LANGUAGE_STORAGE_KEY = 'jerna-lang';

export function getLocalizedPath(lang: Language, path: Route | string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const stripped = normalizedPath.replace(languagePrefixRegex, '');
  const pathWithoutLang = stripped === '' ? '/' : stripped;

  if (lang === defaultLanguage) {
    return pathWithoutLang;
  }

  return pathWithoutLang === '/' ? `/${lang}` : `/${lang}${pathWithoutLang}`;
}

export function getAlternateUrls(
  currentPath: string,
  siteUrl: URL | string
): { lang: Language; hreflang: string; url: string }[] {
  const baseUrl = typeof siteUrl === 'string' ? siteUrl : siteUrl.origin;
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

export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return defaultLanguage;
  }

  const browserLanguages = navigator.languages || [navigator.language];

  for (const browserLang of browserLanguages) {
    const langCode = browserLang.split('-')[0]?.toLowerCase();
    if (langCode && langCode in languages) {
      return langCode as Language;
    }
  }

  return defaultLanguage;
}

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
    return null;
  }

  return null;
}

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

export function getPreferredLanguage(): Language {
  return getStoredLanguage() ?? detectBrowserLanguage();
}

export function switchLanguage(newLang: Language, currentPath: string): string {
  setStoredLanguage(newLang);
  return getLocalizedPath(newLang, currentPath);
}
