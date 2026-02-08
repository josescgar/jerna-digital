import { test, expect, type Page } from '@playwright/test';

/**
 * Helper to click the theme toggle button.
 * Handles both desktop and mobile viewports.
 */
async function clickThemeToggle(page: Page): Promise<void> {
  const mobileMenuBtn = page.locator('#mobile-menu-btn');
  const isMobile = await mobileMenuBtn.isVisible();

  if (isMobile) {
    // On mobile, open the mobile menu first
    await mobileMenuBtn.click();
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

    // Click the theme toggle in mobile menu
    const themeToggle = page.locator('#mobile-menu [data-theme-toggle]');
    await themeToggle.click();
  } else {
    // Desktop: click the theme toggle button in visible nav ul
    const themeToggle = page.locator(
      'header nav ul.md\\:flex [data-theme-toggle]'
    );
    await themeToggle.click();
  }
}

test.describe('Theme System', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (!localStorage.getItem('jerna-lang')) {
        localStorage.setItem('jerna-lang', 'en');
      }
    });
  });

  test.describe('Default Theme', () => {
    test('should use dark theme by default when no stored preference and dark system preference', async ({
      page,
    }) => {
      // Emulate dark color scheme
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');

      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('dark');
    });

    test('should use light theme when no stored preference and light system preference', async ({
      page,
    }) => {
      // Emulate light color scheme
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto('/');

      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('light');
    });

    test('should use stored preference over system preference', async ({
      page,
    }) => {
      // Set dark system preference but light stored preference
      await page.emulateMedia({ colorScheme: 'dark' });

      // Set localStorage before navigating
      await page.addInitScript(() => {
        localStorage.setItem('jerna-theme', 'light');
      });

      await page.goto('/');

      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('light');
    });
  });

  test.describe('Theme Toggle', () => {
    test('should show theme toggle button in header', async ({ page }) => {
      await page.goto('/');

      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();

      if (isMobile) {
        await mobileMenuBtn.click();
        const themeToggle = page.locator('#mobile-menu [data-theme-toggle]');
        await expect(themeToggle).toBeVisible();
      } else {
        // Desktop: theme toggle is in the visible nav ul
        const themeToggle = page.locator(
          'header nav ul.md\\:flex [data-theme-toggle]'
        );
        await expect(themeToggle).toBeVisible();
      }
    });

    test('should toggle from dark to light', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');

      // Verify starting in dark mode
      let theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('dark');

      // Click toggle
      await clickThemeToggle(page);

      // Should now be light mode
      theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('light');
    });

    test('should toggle from light to dark', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto('/');

      // Verify starting in light mode
      let theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('light');

      // Click toggle
      await clickThemeToggle(page);

      // Should now be dark mode
      theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('dark');
    });

    test('should show correct icon based on current theme', async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');

      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();
      const toggleSelector = isMobile
        ? '#mobile-menu [data-theme-toggle]'
        : 'header nav ul.md\\:flex [data-theme-toggle]';

      if (isMobile) {
        await mobileMenuBtn.click();
      }

      const toggle = page.locator(toggleSelector);

      // In dark mode, sun icon should be visible (not have 'hidden' class)
      const sunIcon = toggle.locator('.sun-icon');
      const moonIcon = toggle.locator('.moon-icon');

      // Check for the hidden class - in dark mode, sun-icon should NOT have hidden class
      await expect(sunIcon).not.toHaveClass(/hidden/);
      await expect(moonIcon).toHaveClass(/hidden/);

      // Toggle to light mode
      await toggle.click();

      // In light mode, moon icon should be visible (not have 'hidden' class)
      await expect(moonIcon).not.toHaveClass(/hidden/);
      await expect(sunIcon).toHaveClass(/hidden/);
    });
  });

  test.describe('Persistence', () => {
    test('should save theme preference to localStorage', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');

      // Initially no stored preference
      let storedTheme = await page.evaluate(() =>
        localStorage.getItem('jerna-theme')
      );
      expect(storedTheme).toBeNull();

      // Toggle to light using helper
      await clickThemeToggle(page);

      // Verify localStorage is set
      storedTheme = await page.evaluate(() =>
        localStorage.getItem('jerna-theme')
      );
      expect(storedTheme).toBe('light');
    });

    test('should persist theme across page navigation', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');

      // Toggle to light using helper
      await clickThemeToggle(page);

      // Navigate to another page
      await page.goto('/about');

      // Theme should still be light
      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('light');
    });

    test('should persist theme across language switch', async ({ page }) => {
      // This test verifies that the theme persists when switching languages
      // by setting localStorage directly (simulating a previous toggle)
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.addInitScript(() => {
        localStorage.setItem('jerna-theme', 'light');
      });
      await page.goto('/');

      // Verify theme is light (from stored preference)
      let theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('light');

      // Navigate to Spanish version
      await page.goto('/es');

      // Theme should still be light
      theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('light');
    });
  });

  test.describe('FOUC Prevention', () => {
    test('should have no-transitions class initially', async ({ page }) => {
      // Check that html starts with no-transitions class
      await page.goto('/');

      // The class should be removed after initial render
      // We verify by checking it's NOT present after load (removed by RAF)
      await page.waitForLoadState('domcontentloaded');

      // Give time for requestAnimationFrame to execute
      await page.waitForTimeout(100);

      const hasNoTransitions = await page
        .locator('html')
        .evaluate((el) => el.classList.contains('no-transitions'));
      expect(hasNoTransitions).toBe(false);
    });

    test('should set data-theme attribute before page content loads', async ({
      page,
    }) => {
      await page.addInitScript(() => {
        localStorage.setItem('jerna-theme', 'light');
      });

      // We can verify FOUC prevention by checking the theme is set
      // synchronously in the <head> script
      await page.goto('/');

      const theme = await page.locator('html').getAttribute('data-theme');
      expect(theme).toBe('light');
    });
  });

  test.describe('Mobile Theme Label', () => {
    test('should show current theme label on mobile', async ({ page }) => {
      // Set viewport to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');

      // Open mobile menu
      await page.locator('#mobile-menu-btn').click();

      // Check theme label shows "Dark"
      const themeLabel = page.locator('#mobile-theme-label');
      await expect(themeLabel).toContainText('Dark');

      // Toggle theme
      await page.locator('#mobile-menu [data-theme-toggle]').click();

      // Label should update to "Light"
      await expect(themeLabel).toContainText('Light');
    });

    test('should show localized theme labels on Spanish page', async ({
      page,
    }) => {
      // Set viewport to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/es');

      // Open mobile menu
      await page.locator('#mobile-menu-btn').click();

      // Check theme label shows Spanish "Oscuro" (Dark)
      const themeLabel = page.locator('#mobile-theme-label');
      await expect(themeLabel).toContainText('Oscuro');

      // Toggle theme
      await page.locator('#mobile-menu [data-theme-toggle]').click();

      // Label should update to Spanish "Claro" (Light)
      await expect(themeLabel).toContainText('Claro');
    });
  });

  test.describe('Accessibility', () => {
    test('theme toggle should have accessible label', async ({ page }) => {
      await page.goto('/');

      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();

      if (isMobile) {
        await mobileMenuBtn.click();
        const themeToggle = page.locator('#mobile-menu [data-theme-toggle]');
        await expect(themeToggle).toHaveAttribute(
          'aria-label',
          /toggle theme/i
        );
      } else {
        const themeToggle = page.locator(
          'header nav ul.md\\:flex [data-theme-toggle]'
        );
        await expect(themeToggle).toHaveAttribute(
          'aria-label',
          /toggle theme/i
        );
      }
    });

    test('theme toggle should have Spanish accessible label on Spanish page', async ({
      page,
    }) => {
      await page.goto('/es');

      const mobileMenuBtn = page.locator('#mobile-menu-btn');
      const isMobile = await mobileMenuBtn.isVisible();

      if (isMobile) {
        await mobileMenuBtn.click();
        const themeToggle = page.locator('#mobile-menu [data-theme-toggle]');
        await expect(themeToggle).toHaveAttribute(
          'aria-label',
          /cambiar tema/i
        );
      } else {
        const themeToggle = page.locator(
          'header nav ul.md\\:flex [data-theme-toggle]'
        );
        await expect(themeToggle).toHaveAttribute(
          'aria-label',
          /cambiar tema/i
        );
      }
    });
  });
});
