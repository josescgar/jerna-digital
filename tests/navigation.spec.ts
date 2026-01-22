import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Jerna Digital/);
  });

  test('should navigate to About page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About');
  });

  test('should navigate to Services page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/services"]');
    await expect(page).toHaveURL('/services');
    await expect(page.locator('h1')).toContainText('Services');
  });

  test('should navigate to Case Studies page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/case-studies"]');
    await expect(page).toHaveURL('/case-studies');
    await expect(page.locator('h1')).toContainText('Case Studies');
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText('Get in Touch');
  });

  test('should have working logo link to home', async ({ page }) => {
    await page.goto('/about');
    await page.click('header a[href="/"]');
    await expect(page).toHaveURL('/');
  });
});
