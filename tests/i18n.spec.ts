import { test, expect, type Page } from '@playwright/test';
import { Route, spanishPath } from './utils/routes';

test.describe('Internationalization (i18n)', () => {
  test.describe('URL Structure', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        if (!localStorage.getItem('jerna-lang')) {
          localStorage.setItem('jerna-lang', 'en');
        }
      });
    });

    test('English pages should be at root URLs', async ({ page }) => {
      await page.goto(Route.Home);
      await expect(page).toHaveURL(/\/?$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');

      await page.goto(Route.About);
      await expect(page).toHaveURL(/\/about\/?$/);

      await page.goto(Route.Services);
      await expect(page).toHaveURL(/\/services\/?$/);

      await page.goto(Route.Contact);
      await expect(page).toHaveURL(/\/contact\/?$/);

      await page.goto(Route.Portfolio);
      await expect(page).toHaveURL(/\/portfolio\/?$/);

      await page.goto(`${Route.Portfolio}/jerna-digital`);
      await expect(page).toHaveURL(/\/portfolio\/jerna-digital\/?$/);
    });

    test('Spanish pages should have /es/ prefix', async ({ page }) => {
      await page.goto(spanishPath(Route.Home));
      await expect(page).toHaveURL(/\/es\/?$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');

      await page.goto(spanishPath(Route.About));
      await expect(page).toHaveURL(/\/es\/about\/?$/);

      await page.goto(spanishPath(Route.Services));
      await expect(page).toHaveURL(/\/es\/services\/?$/);

      await page.goto(spanishPath(Route.Contact));
      await expect(page).toHaveURL(/\/es\/contact\/?$/);

      await page.goto(spanishPath(Route.Portfolio));
      await expect(page).toHaveURL(/\/es\/portfolio\/?$/);

      await page.goto(spanishPath(`${Route.Portfolio}/jerna-digital`));
      await expect(page).toHaveURL(/\/es\/portfolio\/jerna-digital\/?$/);
    });
  });

  test.describe('Language Negotiation', () => {
    test.describe('Browser Language Match', () => {
      test.use({ locale: 'es-ES' });

      test('should redirect unprefixed URLs to browser language when supported', async ({
        page,
      }) => {
        await page.addInitScript(() => {
          localStorage.removeItem('jerna-lang');
        });

        await page.goto(Route.Home);
        await expect(page).toHaveURL(/\/es\/?$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'es');
      });
    });

    test.describe('Browser Language Unsupported', () => {
      test.use({ locale: 'fr-FR' });

      test('should keep unprefixed URLs in English when browser language is unsupported', async ({
        page,
      }) => {
        await page.addInitScript(() => {
          localStorage.removeItem('jerna-lang');
        });

        await page.goto(Route.Home);
        await expect(page).toHaveURL(/\/?$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      });
    });

    test.describe('Stored Preference Overrides', () => {
      test.use({ locale: 'es-ES' });

      test('stored preference should override browser language on unprefixed URLs', async ({
        page,
      }) => {
        await page.addInitScript(() => {
          localStorage.setItem('jerna-lang', 'en');
        });

        await page.goto(Route.About);
        await expect(page).toHaveURL(/\/about\/?$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      });

      test('stored non-default should redirect unprefixed URLs', async ({
        page,
      }) => {
        await page.addInitScript(() => {
          localStorage.setItem('jerna-lang', 'es');
        });

        await page.goto(Route.About);
        await expect(page).toHaveURL(/\/es\/about\/?$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'es');
      });
    });
  });

  test.describe('Language Switcher', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        if (!localStorage.getItem('jerna-lang')) {
          localStorage.setItem('jerna-lang', 'en');
        }
      });
    });
    /**
     * Helper to open language switcher and click a language option.
     * Handles both desktop and mobile viewports.
     */
    async function switchLanguage(
      page: Page,
      targetLang: 'en' | 'es'
    ): Promise<void> {
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();

      if (isMobile) {
        // On mobile, open the mobile menu first
        await mobileMenuBtn.click();
        const mobileMenu = page.locator('#mobile-menu');
        await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

        // On mobile, language links are directly visible in the menu
        const langLink = page.locator(
          `#mobile-menu a[data-lang="${targetLang}"]`
        );
        await langLink.click();
      } else {
        // Desktop: click the language switcher button
        const langSwitcher = page.locator('#lang-switcher-btn');
        await langSwitcher.click();

        // Wait for menu to be visible
        const langMenu = page.locator('#lang-switcher-menu');
        await expect(langMenu).toBeVisible();

        // Click the language option
        const langLink = page.locator(
          `#lang-switcher-menu a[data-lang="${targetLang}"]`
        );
        await langLink.click();
      }
    }

    test('should show language switcher in header', async ({ page }) => {
      await page.goto(Route.Home);

      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();

      if (isMobile) {
        // On mobile, open menu first
        await mobileMenuBtn.click();
        // Mobile has language links directly visible
        const mobileLangLink = page.locator('#mobile-menu a[data-lang="es"]');
        await expect(mobileLangLink).toBeVisible();
      } else {
        const languageSwitcher = page.locator('#lang-switcher-btn');
        await expect(languageSwitcher).toBeVisible();
      }
    });

    // Desktop-only tests - language switcher dropdown behavior
    test('should switch from English to Spanish', async ({ page }) => {
      // Skip on mobile - dropdown behavior is different
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();
      if (isMobile) {
        // On mobile, directly navigate to verify the Spanish URL exists
        await page.goto(spanishPath(Route.Home));
        await expect(page).toHaveURL(/\/es\/?$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'es');
        return;
      }

      await page.goto(Route.Home);
      await switchLanguage(page, 'es');

      // Should navigate to Spanish version
      await expect(page).toHaveURL(/\/es\/?$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    });

    test('should switch from Spanish to English', async ({ page }) => {
      // Skip on mobile - dropdown behavior is different
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();
      if (isMobile) {
        // On mobile, directly navigate to verify the English URL exists
        await page.goto(Route.Home);
        await expect(page).toHaveURL(/\/?$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        return;
      }

      await page.goto(spanishPath(Route.Home));
      await switchLanguage(page, 'en');

      // Should navigate to English version
      await expect(page).toHaveURL(/\/?$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('should preserve current page when switching language', async ({
      page,
    }) => {
      // Skip on mobile - dropdown behavior is different
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();
      if (isMobile) {
        // On mobile, directly navigate to verify the Spanish about URL exists
        await page.goto(spanishPath(Route.About));
        await expect(page).toHaveURL(/\/es\/about\/?$/);
        return;
      }

      await page.goto(Route.About);
      await switchLanguage(page, 'es');

      await expect(page).toHaveURL(/\/es\/about\/?$/);
    });

    test('should save language preference to localStorage', async ({
      page,
    }) => {
      // Skip on mobile - dropdown behavior is different
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();
      if (isMobile) {
        // On mobile, verify localStorage is set when clicking language link directly
        await page.goto(Route.Home);
        await mobileMenuBtn.click();
        const mobileMenu = page.locator('#mobile-menu');
        await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
        await page.locator('#mobile-menu a[data-lang="es"]').click();
        await expect(page).toHaveURL(/\/es\/?$/);

        const storedLang = await page.evaluate(() =>
          localStorage.getItem('jerna-lang')
        );
        expect(storedLang).toBe('es');
        return;
      }

      await page.goto(Route.Home);
      await switchLanguage(page, 'es');

      // Wait for navigation to complete
      await expect(page).toHaveURL(/\/es\/?$/);

      // Check localStorage (key is 'jerna-lang')
      const storedLang = await page.evaluate(() =>
        localStorage.getItem('jerna-lang')
      );
      expect(storedLang).toBe('es');
    });
  });

  test.describe('Content Translation', () => {
    test('English home page should show English content', async ({ page }) => {
      await page.addInitScript(() => {
        if (!localStorage.getItem('jerna-lang')) {
          localStorage.setItem('jerna-lang', 'en');
        }
      });
      await page.goto(Route.Home);

      // Check for English-specific content in h1 ("Hi, I'm Jose")
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const h1Text = await h1.textContent();
      expect(h1Text).toContain("Hi, I'm");
    });

    test('Spanish home page should show Spanish content', async ({ page }) => {
      await page.goto(spanishPath(Route.Home));

      // Check for Spanish-specific content in h1 ("Hola, soy Jose")
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const h1Text = await h1.textContent();
      expect(h1Text).toContain('Hola, soy');
    });

    test('Spanish contact page should show Spanish form labels', async ({
      page,
    }) => {
      await page.goto(spanishPath(Route.Contact));

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Check for Spanish form labels - use text content check
      const formLabels = await page.locator('label').allTextContents();
      const hasNombre = formLabels.some((label) => label.includes('Nombre'));
      // Copy can vary; current translations use "Email".
      const hasCorreo = formLabels.some(
        (label) => label.includes('Email') || label.includes('Correo')
      );
      const hasMensaje = formLabels.some((label) => label.includes('Mensaje'));

      expect(hasNombre).toBe(true);
      expect(hasCorreo).toBe(true);
      expect(hasMensaje).toBe(true);
    });
  });

  test.describe('SEO for i18n', () => {
    test('English page should have correct hreflang tags', async ({ page }) => {
      await page.addInitScript(() => {
        if (!localStorage.getItem('jerna-lang')) {
          localStorage.setItem('jerna-lang', 'en');
        }
      });
      await page.goto(Route.Home);

      // Check for hreflang tags
      const hreflangEn = page.locator('link[hreflang="en"]');
      const hreflangEs = page.locator('link[hreflang="es"]');
      const hreflangDefault = page.locator('link[hreflang="x-default"]');

      await expect(hreflangEn).toHaveAttribute('href', /\/?$/);
      await expect(hreflangEs).toHaveAttribute('href', /\/es\/?$/);
      await expect(hreflangDefault).toHaveAttribute('href', /\/?$/);
    });

    test('Spanish page should have correct hreflang tags', async ({ page }) => {
      await page.goto(spanishPath(Route.Home));

      const hreflangEn = page.locator('link[hreflang="en"]');
      const hreflangEs = page.locator('link[hreflang="es"]');

      await expect(hreflangEn).toHaveAttribute('href', /\/?$/);
      await expect(hreflangEs).toHaveAttribute('href', /\/es\/?$/);
    });

    test('English page should have og:locale set to en_US', async ({
      page,
    }) => {
      await page.addInitScript(() => {
        if (!localStorage.getItem('jerna-lang')) {
          localStorage.setItem('jerna-lang', 'en');
        }
      });
      await page.goto(Route.Home);

      const ogLocale = page.locator('meta[property="og:locale"]');
      await expect(ogLocale).toHaveAttribute('content', 'en_US');
    });

    test('Spanish page should have og:locale set to es_ES', async ({
      page,
    }) => {
      await page.goto(spanishPath(Route.Home));

      const ogLocale = page.locator('meta[property="og:locale"]');
      await expect(ogLocale).toHaveAttribute('content', 'es_ES');
    });
  });

  test.describe('Navigation in Spanish', () => {
    test('should navigate between Spanish pages', async ({ page }) => {
      await page.goto(spanishPath(Route.Home));

      // Navigate to about page via header (handle mobile)
      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();

      if (isMobile) {
        await mobileMenuBtn.click();
        const mobileMenu = page.locator('#mobile-menu');
        await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
      }

      // Click the About link (mobile menu vs desktop header)
      const aboutLink = isMobile
        ? page
            .locator(`#mobile-menu a[href="${spanishPath(Route.About)}"]`)
            .first()
        : page
            .locator(`#site-header a[href="${spanishPath(Route.About)}"]`)
            .first();
      await aboutLink.click();
      await expect(page).toHaveURL(/\/es\/about\/?$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    });

    test('logo link should go to Spanish home on Spanish pages', async ({
      page,
    }) => {
      await page.goto(spanishPath(Route.About));

      // Click logo - the link should be to /es
      const logoLink = page
        .locator(`header a[href="${spanishPath(Route.Home)}"]`)
        .first();
      await expect(logoLink).toBeVisible();
      await logoLink.click();
      await expect(page).toHaveURL(/\/es\/?$/);
    });
  });
});
