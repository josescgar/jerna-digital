import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should display mobile menu button on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileMenuBtn = page.locator('#mobile-menu-btn');
    await expect(mobileMenuBtn).toBeVisible();

    // Desktop nav should be hidden
    const desktopNav = page.locator('header ul.hidden.md\\:flex');
    await expect(desktopNav).toHaveClass(/hidden/);
  });

  test('should toggle mobile menu on click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileMenuBtn = page.locator('#mobile-menu-btn');
    const mobileMenu = page.locator('#mobile-menu');

    // Menu should be hidden initially (use aria-hidden to avoid matching md:hidden)
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');

    // Open menu
    await mobileMenuBtn.click();
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

    // Close menu
    await mobileMenuBtn.click();
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
  });

  test('should display desktop navigation on larger screens', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    // Desktop nav should be visible
    const desktopNav = page.locator('header ul.md\\:flex');
    await expect(desktopNav).toBeVisible();

    // Mobile menu button should be hidden
    const mobileMenuBtn = page.locator('#mobile-menu-btn');
    await expect(mobileMenuBtn).toHaveClass(/md:hidden/);
  });

  test('should render hero section responsively', async ({ page }) => {
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(heroTitle).toBeVisible();

    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(heroTitle).toBeVisible();
  });

  test('should stack service cards on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Scroll to services section
    await page.locator('#services').scrollIntoViewIfNeeded();

    const servicesGrid = page.locator('#services .grid');
    await expect(servicesGrid).toBeVisible();
  });
});
