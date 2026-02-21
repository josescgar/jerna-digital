import { test, expect } from '@playwright/test';
import { Route } from './utils/routes';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (!localStorage.getItem('jerna-lang')) {
        localStorage.setItem('jerna-lang', 'en');
      }
    });

    await page.goto(Route.Contact);

    // ContactForm is a hydrated React island. Wait until hydration completes
    // so React doesn't overwrite values we fill during tests.
    const contactFormIsland = page.locator('astro-island[opts*="ContactForm"]');
    await expect(contactFormIsland).toHaveCount(1);
    await expect(contactFormIsland).not.toHaveAttribute('ssr', /.*/, {
      timeout: 15000,
    });
  });

  test('should display the contact form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Message is required')).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('textarea[name="message"]', 'This is a test message');
    await page.click('button[type="submit"]');

    await expect(
      page.locator('text=Please enter a valid email address')
    ).toBeVisible();
  });

  test('should clear error when user starts typing', async ({ page }) => {
    // Trigger validation error
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Name is required')).toBeVisible();

    // Start typing
    await page.fill('input[name="name"]', 'J');

    // Error should be cleared
    await expect(page.locator('text=Name is required')).not.toBeVisible();
  });

  test('should have accessible form labels', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');

    // Check that inputs have associated labels
    await expect(nameInput).toHaveAttribute('id', 'name');
    await expect(emailInput).toHaveAttribute('id', 'email');
    await expect(messageInput).toHaveAttribute('id', 'message');

    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="message"]')).toBeVisible();
  });
});
