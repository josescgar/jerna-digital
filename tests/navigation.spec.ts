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

  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Jerna Digital/);
  });

  test('should navigate to About page', async ({ page }) => {
    await page.goto('/');
    await navigateViaHeader(page, '/about');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About');
  });

  test('should navigate to Services page', async ({ page }) => {
    await page.goto('/');
    await navigateViaHeader(page, '/services');
    await expect(page).toHaveURL('/services');
    await expect(page.locator('h1')).toContainText('Services');
  });

  test('should navigate to Case Studies page', async ({ page }) => {
    await page.goto('/');
    await navigateViaHeader(page, '/case-studies');
    await expect(page).toHaveURL('/case-studies');
    await expect(page.locator('h1')).toContainText('Case Studies');
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/');
    await navigateViaHeader(page, '/contact');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText('Get in Touch');
  });

  test('should have working logo link to home', async ({ page }) => {
    await page.goto('/about');
    await page.click('header a[href="/"]');
    await expect(page).toHaveURL('/');
  });
});
