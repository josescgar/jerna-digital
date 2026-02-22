import { setStoredLanguage } from '@/features/i18n/i18n.utils';
import { Language } from '@/features/i18n/i18n.translations';

declare global {
  interface Window {
    __jernaHeaderInitialized?: boolean;
  }
}

function getHeaderElements(): {
  menuBtn: HTMLElement | null;
  mobileMenu: HTMLElement | null;
  langBtn: HTMLElement | null;
  langMenu: HTMLElement | null;
} {
  return {
    menuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    langBtn: document.getElementById('lang-switcher-btn'),
    langMenu: document.getElementById('lang-switcher-menu'),
  };
}

function updateMobileThemeLabel(): void {
  const label = document.getElementById('mobile-theme-label');
  if (!label) {
    return;
  }

  const lightLabel = label.dataset.lightLabel ?? 'Light';
  const darkLabel = label.dataset.darkLabel ?? 'Dark';
  const isLight =
    document.documentElement.getAttribute('data-theme') === 'light';
  label.textContent = isLight ? lightLabel : darkLabel;
}

function toggleMobileMenu(): void {
  const { menuBtn, mobileMenu } = getHeaderElements();
  if (!menuBtn || !mobileMenu) {
    return;
  }

  const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!isExpanded));
  mobileMenu.classList.toggle('hidden');
  mobileMenu.setAttribute('aria-hidden', String(isExpanded));
  document.body.style.overflow = isExpanded ? '' : 'hidden';
}

function toggleLanguageMenu(): void {
  const { langBtn, langMenu } = getHeaderElements();
  if (!langBtn || !langMenu) {
    return;
  }

  const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
  langBtn.setAttribute('aria-expanded', String(!isExpanded));
  langMenu.classList.toggle('hidden');
}

function closeLanguageMenu(): void {
  const { langBtn, langMenu } = getHeaderElements();
  if (
    !langBtn ||
    !langMenu ||
    langBtn.getAttribute('aria-expanded') !== 'true'
  ) {
    return;
  }

  langBtn.setAttribute('aria-expanded', 'false');
  langMenu.classList.add('hidden');
}

function onHeaderClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const menuButton = target.closest('#mobile-menu-btn');
  if (menuButton) {
    toggleMobileMenu();
    return;
  }

  const languageButton = target.closest('#lang-switcher-btn');
  if (languageButton) {
    event.stopPropagation();
    toggleLanguageMenu();
    return;
  }

  const languageLink = target.closest<HTMLElement>('[data-lang]');
  if (languageLink?.dataset.lang) {
    if (languageLink.dataset.lang === 'en') {
      setStoredLanguage(Language.EN);
    } else if (languageLink.dataset.lang === 'es') {
      setStoredLanguage(Language.ES);
    }
  }

  const { menuBtn, mobileMenu, langBtn, langMenu } = getHeaderElements();
  if (
    menuBtn?.getAttribute('aria-expanded') === 'true' &&
    mobileMenu &&
    !mobileMenu.contains(target) &&
    !menuBtn.contains(target)
  ) {
    toggleMobileMenu();
  }

  if (
    langBtn?.getAttribute('aria-expanded') === 'true' &&
    langMenu &&
    !langMenu.contains(target) &&
    !langBtn.contains(target)
  ) {
    closeLanguageMenu();
  }
}

function onHeaderKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Escape') {
    return;
  }

  const { menuBtn } = getHeaderElements();
  if (menuBtn?.getAttribute('aria-expanded') === 'true') {
    toggleMobileMenu();
  }

  closeLanguageMenu();
}

function initHeaderClient(): void {
  if (typeof window === 'undefined' || window.__jernaHeaderInitialized) {
    return;
  }

  window.__jernaHeaderInitialized = true;
  document.addEventListener('click', onHeaderClick);
  document.addEventListener('keydown', onHeaderKeydown);
  updateMobileThemeLabel();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-theme'
      ) {
        updateMobileThemeLabel();
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
}

initHeaderClient();
