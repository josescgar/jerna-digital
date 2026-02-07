import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have skip to main content link', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('a[href="#main-content"]');

    // Verify skip link exists and has correct text
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveText('Skip to main content');

    // Focus the skip link directly and verify it becomes visible
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });

  test('should have proper heading hierarchy on home page', async ({
    page,
  }) => {
    await page.goto('/');

    // Should have exactly one h1
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);

    // Should have h2 elements for sections
    const h2Elements = page.locator('h2');
    expect(await h2Elements.count()).toBeGreaterThan(0);
  });

  test('should have proper heading hierarchy on about page', async ({
    page,
  }) => {
    await page.goto('/about');

    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
  });

  test('should have alt text or aria-labels for interactive elements', async ({
    page,
  }) => {
    await page.goto('/');

    // Check header navigation has proper labels
    const mobileMenuBtn = page.locator('#mobile-menu-btn');
    await expect(mobileMenuBtn).toHaveAttribute('aria-label', 'Toggle menu');

    // Check logo link has accessible label
    const logoLink = page
      .locator('#site-header a[aria-label="Jerna Digital"]')
      .first();
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute('aria-label', 'Jerna Digital');
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/');

    // Focus the logo link directly and verify it has visible focus
    const logoLink = page
      .locator('#site-header a[aria-label="Jerna Digital"]')
      .first();
    await logoLink.focus();

    // Check that focused element is visible and has focus
    await expect(logoLink).toBeFocused();
    await expect(logoLink).toBeVisible();
  });

  test('should have proper ARIA attributes on mobile menu', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileMenuBtn = page.locator('#mobile-menu-btn');
    const mobileMenu = page.locator('#mobile-menu');

    // Check initial ARIA state
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');

    // Open menu
    await mobileMenuBtn.click();

    // Check updated ARIA state
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
  });

  test('should close mobile menu on Escape key', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileMenuBtn = page.locator('#mobile-menu-btn');
    const mobileMenu = page.locator('#mobile-menu');

    // Open menu
    await mobileMenuBtn.click();
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

    // Press Escape
    await page.keyboard.press('Escape');

    // Menu should be closed
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
  });

  test('form inputs should have proper labels', async ({ page }) => {
    await page.goto('/contact');

    // Check that labels are properly associated
    const nameLabel = page.locator('label[for="name"]');
    const nameInput = page.locator('#name');

    await expect(nameLabel).toBeVisible();
    await expect(nameInput).toBeVisible();

    // Clicking label should focus input
    await nameLabel.click();
    await expect(nameInput).toBeFocused();
  });
});
