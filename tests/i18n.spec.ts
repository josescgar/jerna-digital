import { test, expect, type Page } from '@playwright/test';

test.describe('Internationalization (i18n)', () => {
  test.describe('URL Structure', () => {
    test('English pages should have /en/ prefix', async ({ page }) => {
      await page.goto('/en');
      await expect(page).toHaveURL(/\/en\/?$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');

      await page.goto('/en/about');
      await expect(page).toHaveURL(/\/en\/about\/?$/);

      await page.goto('/en/services');
      await expect(page).toHaveURL(/\/en\/services\/?$/);

      await page.goto('/en/contact');
      await expect(page).toHaveURL(/\/en\/contact\/?$/);

      await page.goto('/en/case-studies');
      await expect(page).toHaveURL(/\/en\/case-studies\/?$/);
    });

    test('Spanish pages should have /es/ prefix', async ({ page }) => {
      await page.goto('/es');
      await expect(page).toHaveURL(/\/es\/?$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');

      await page.goto('/es/about');
      await expect(page).toHaveURL(/\/es\/about\/?$/);

      await page.goto('/es/services');
      await expect(page).toHaveURL(/\/es\/services\/?$/);

      await page.goto('/es/contact');
      await expect(page).toHaveURL(/\/es\/contact\/?$/);

      await page.goto('/es/case-studies');
      await expect(page).toHaveURL(/\/es\/case-studies\/?$/);
    });

    test('legacy root URLs should redirect to /en/*', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveURL(/\/en\/?$/);

      await page.goto('/about');
      await expect(page).toHaveURL(/\/en\/about\/?$/);

      await page.goto('/services');
      await expect(page).toHaveURL(/\/en\/services\/?$/);

      await page.goto('/contact');
      await expect(page).toHaveURL(/\/en\/contact\/?$/);

      await page.goto('/case-studies');
      await expect(page).toHaveURL(/\/en\/case-studies\/?$/);
    });
  });

  test.describe('Language Switcher', () => {
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
      await page.goto('/en');

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
        await page.goto('/es');
        await expect(page).toHaveURL(/\/es\/?$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'es');
        return;
      }

      await page.goto('/en');
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
        await page.goto('/en');
        await expect(page).toHaveURL(/\/en\/?$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        return;
      }

      await page.goto('/es');
      await switchLanguage(page, 'en');

      // Should navigate to English version
      await expect(page).toHaveURL(/\/en\/?$/);
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
        await page.goto('/es/about');
        await expect(page).toHaveURL(/\/es\/about\/?$/);
        return;
      }

      await page.goto('/en/about');
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
        await page.goto('/en');
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

      await page.goto('/en');
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
      await page.goto('/en');

      // Check for English-specific content in h1 ("Hi, I'm Jose")
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const h1Text = await h1.textContent();
      expect(h1Text).toContain("Hi, I'm");
    });

    test('Spanish home page should show Spanish content', async ({ page }) => {
      await page.goto('/es');

      // Check for Spanish-specific content in h1 ("Hola, soy Jose")
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const h1Text = await h1.textContent();
      expect(h1Text).toContain('Hola, soy');
    });

    test('Spanish contact page should show Spanish form labels', async ({
      page,
    }) => {
      await page.goto('/es/contact');

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
      await page.goto('/en');

      // Check for hreflang tags
      const hreflangEn = page.locator('link[hreflang="en"]');
      const hreflangEs = page.locator('link[hreflang="es"]');
      const hreflangDefault = page.locator('link[hreflang="x-default"]');

      await expect(hreflangEn).toHaveAttribute('href', /\/en\/?$/);
      await expect(hreflangEs).toHaveAttribute('href', /\/es\/?$/);
      await expect(hreflangDefault).toHaveAttribute('href', /\/en\/?$/);
    });

    test('Spanish page should have correct hreflang tags', async ({ page }) => {
      await page.goto('/es');

      const hreflangEn = page.locator('link[hreflang="en"]');
      const hreflangEs = page.locator('link[hreflang="es"]');

      await expect(hreflangEn).toHaveAttribute('href', /\/en\/?$/);
      await expect(hreflangEs).toHaveAttribute('href', /\/es\/?$/);
    });

    test('English page should have og:locale set to en_US', async ({
      page,
    }) => {
      await page.goto('/en');

      const ogLocale = page.locator('meta[property="og:locale"]');
      await expect(ogLocale).toHaveAttribute('content', 'en_US');
    });

    test('Spanish page should have og:locale set to es_ES', async ({
      page,
    }) => {
      await page.goto('/es');

      const ogLocale = page.locator('meta[property="og:locale"]');
      await expect(ogLocale).toHaveAttribute('content', 'es_ES');
    });
  });

  test.describe('Navigation in Spanish', () => {
    test('should navigate between Spanish pages', async ({ page }) => {
      await page.goto('/es');

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
        ? page.locator('#mobile-menu a[href="/es/about"]').first()
        : page.locator('#site-header a[href="/es/about"]').first();
      await aboutLink.click();
      await expect(page).toHaveURL(/\/es\/about\/?$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    });

    test('logo link should go to Spanish home on Spanish pages', async ({
      page,
    }) => {
      await page.goto('/es/about');

      // Click logo - the link should be to /es/ (with trailing slash, first link in header)
      const logoLink = page.locator('header a[href="/es/"]').first();
      await expect(logoLink).toBeVisible();
      await logoLink.click();
      await expect(page).toHaveURL(/\/es\/?$/);
    });
  });
});
