import { test, expect } from '@playwright/test';

test.describe('SEO', () => {
  test('home page should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Title
    await expect(page).toHaveTitle(/Jerna Digital/);

    // Description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);

    // Canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href');
  });

  test('should have Open Graph meta tags', async ({ page }) => {
    await page.goto('/');

    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogImage = page.locator('meta[property="og:image"]');
    const ogType = page.locator('meta[property="og:type"]');
    const ogUrl = page.locator('meta[property="og:url"]');

    await expect(ogTitle).toHaveAttribute('content', /.+/);
    await expect(ogDescription).toHaveAttribute('content', /.+/);
    await expect(ogImage).toHaveAttribute('content', /.+/);
    await expect(ogType).toHaveAttribute('content', 'website');
    await expect(ogUrl).toHaveAttribute('content', /.+/);
  });

  test('should have Twitter Card meta tags', async ({ page }) => {
    await page.goto('/');

    const twitterCard = page.locator('meta[name="twitter:card"]');
    const twitterTitle = page.locator('meta[name="twitter:title"]');
    const twitterDescription = page.locator('meta[name="twitter:description"]');
    const twitterImage = page.locator('meta[name="twitter:image"]');

    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    await expect(twitterTitle).toHaveAttribute('content', /.+/);
    await expect(twitterDescription).toHaveAttribute('content', /.+/);
    await expect(twitterImage).toHaveAttribute('content', /.+/);
  });

  test('should have JSON-LD structured data', async ({ page }) => {
    await page.goto('/');

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();

    const content = await jsonLd.textContent();
    expect(content).not.toBeNull();

    const data = JSON.parse(content!) as {
      '@context': string;
      '@type': string;
      name: string;
    };
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('ProfessionalService');
    expect(data.name).toBe('Jerna Digital');
  });

  test('about page should have unique meta tags', async ({ page }) => {
    await page.goto('/about');

    const title = await page.title();
    expect(title).toContain('About');
    expect(title).toContain('Jerna Digital');
  });

  test('services page should have unique meta tags', async ({ page }) => {
    await page.goto('/services');

    const title = await page.title();
    expect(title).toContain('Services');
    expect(title).toContain('Jerna Digital');
  });

  test('should have viewport meta tag', async ({ page }) => {
    await page.goto('/');

    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute(
      'content',
      'width=device-width, initial-scale=1.0'
    );
  });

  test('should have charset meta tag', async ({ page }) => {
    await page.goto('/');

    const charset = page.locator('meta[charset]');
    await expect(charset).toHaveAttribute('charset', 'UTF-8');
  });
});
