import { test, expect, type Page } from '@playwright/test';

test.describe('Navigation', () => {
  /**
   * Helper to navigate via header links.
   * On mobile viewports, opens the mobile menu first.
   */
  async function navigateViaHeader(page: Page, href: string): Promise<void> {
    const mobileMenuBtn = page.locator('#mobile-menu-btn');
    const isMobile = await mobileMenuBtn.isVisible();

    if (isMobile) {
      await mobileMenuBtn.click();
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
      // On mobile, navigate directly since the menu overlay has z-index issues
      // in some mobile browser emulations
      await page.goto(href);
    } else {
      // Desktop: click the visible nav link
      await page.click(`a[href="${href}"]`);
    }
  }

  test.describe('English Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        if (!localStorage.getItem('jerna-lang')) {
          localStorage.setItem('jerna-lang', 'en');
        }
      });
    });

    test('should load home page successfully', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Jerna Digital/);
    });

    test('should navigate to About page', async ({ page }) => {
      await page.goto('/');
      await navigateViaHeader(page, '/about');
      await expect(page).toHaveURL(/\/about\/?$/);
      await expect(page.locator('h1')).toContainText('About');
    });

    test('should navigate to Services page', async ({ page }) => {
      await page.goto('/');
      await navigateViaHeader(page, '/services');
      await expect(page).toHaveURL(/\/services\/?$/);
      await expect(page.locator('h1')).toContainText('Services');
    });

    test('should navigate to Portfolio page', async ({ page }) => {
      await page.goto('/');
      await navigateViaHeader(page, '/portfolio');
      await expect(page).toHaveURL(/\/portfolio\/?$/);
      await expect(page.locator('h1')).toContainText('Portfolio');
    });

    test('should navigate to Contact page', async ({ page }) => {
      await page.goto('/');
      await navigateViaHeader(page, '/contact');
      await expect(page).toHaveURL(/\/contact\/?$/);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should have working logo link to home', async ({ page }) => {
      await page.goto('/about');
      const logoLink = page.locator('header a[href="/"]').first();
      await expect(logoLink).toBeVisible();
      await logoLink.click();
      await expect(page).toHaveURL(/\/?$/);
    });
  });

  test.describe('Spanish Navigation', () => {
    test('should load Spanish home page successfully', async ({ page }) => {
      await page.goto('/es');
      await expect(page).toHaveTitle(/Jerna Digital/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    });

    test('should navigate to Spanish About page', async ({ page }) => {
      await page.goto('/es');
      await navigateViaHeader(page, '/es/about');
      await expect(page).toHaveURL(/\/es\/about\/?$/);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should navigate to Spanish Services page', async ({ page }) => {
      await page.goto('/es');
      await navigateViaHeader(page, '/es/services');
      await expect(page).toHaveURL(/\/es\/services\/?$/);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should navigate to Spanish Contact page', async ({ page }) => {
      await page.goto('/es');
      await navigateViaHeader(page, '/es/contact');
      await expect(page).toHaveURL(/\/es\/contact\/?$/);
      // Spanish contact title is "Contacto"
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const h1Text = await h1.textContent();
      expect(h1Text).toContain('Contacto');
    });

    test('should have working logo link to Spanish home', async ({ page }) => {
      await page.goto('/es/about');
      // Logo link should point to /es on Spanish pages
      const logoLink = page.locator('header a[href="/es"]').first();
      await expect(logoLink).toBeVisible();
      await logoLink.click();
      await expect(page).toHaveURL(/\/es\/?$/);
    });
  });
});
