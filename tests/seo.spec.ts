import { test, expect } from '@playwright/test';
import { Route, spanishPath } from './utils/routes';

function readPngDimensions(data: Buffer): { width: number; height: number } {
  const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];

  expect(data.length).toBeGreaterThanOrEqual(24);

  for (const [index, byte] of pngSignature.entries()) {
    expect(data[index]).toBe(byte);
  }

  const chunkType = data.toString('ascii', 12, 16);
  expect(chunkType).toBe('IHDR');

  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);

  return { width, height };
}

test.describe('SEO', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (!localStorage.getItem('jerna-lang')) {
        localStorage.setItem('jerna-lang', 'en');
      }
    });
  });

  test('home page should have proper meta tags', async ({ page }) => {
    await page.goto(Route.Home);

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
    await page.goto(Route.Home);

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
    await page.goto(Route.Home);

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
    await page.goto(Route.Home);

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
    await page.goto(Route.About);

    const title = await page.title();
    expect(title).toContain('About');
    expect(title).toContain('Jerna Digital');
  });

  test('services page should have unique meta tags', async ({ page }) => {
    await page.goto(Route.Services);

    const title = await page.title();
    expect(title).toContain('Services');
    expect(title).toContain('Jerna Digital');
  });

  test('portfolio detail page should have proper meta tags', async ({
    page,
  }) => {
    await page.goto(`${Route.Portfolio}/jerna-digital`);

    const title = await page.title();
    expect(title).toContain('Jerna Digital');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);

    const hreflangEn = page.locator('link[hreflang="en"]');
    const hreflangEs = page.locator('link[hreflang="es"]');
    await expect(hreflangEn).toBeAttached();
    await expect(hreflangEs).toBeAttached();
  });

  test('should have viewport meta tag', async ({ page }) => {
    await page.goto(Route.Home);

    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute(
      'content',
      'width=device-width, initial-scale=1.0'
    );
  });

  test('should have charset meta tag', async ({ page }) => {
    await page.goto(Route.Home);

    const charset = page.locator('meta[charset]');
    await expect(charset).toHaveAttribute('charset', 'UTF-8');
  });

  test.describe('i18n SEO', () => {
    test('should have hreflang tags on English pages', async ({ page }) => {
      await page.goto(Route.Home);

      const hreflangEn = page.locator('link[hreflang="en"]');
      const hreflangEs = page.locator('link[hreflang="es"]');
      const hreflangDefault = page.locator('link[hreflang="x-default"]');

      await expect(hreflangEn).toBeAttached();
      await expect(hreflangEs).toBeAttached();
      await expect(hreflangDefault).toBeAttached();
    });

    test('should have hreflang tags on Spanish pages', async ({ page }) => {
      await page.goto(spanishPath(Route.Home));

      const hreflangEn = page.locator('link[hreflang="en"]');
      const hreflangEs = page.locator('link[hreflang="es"]');
      const hreflangDefault = page.locator('link[hreflang="x-default"]');

      await expect(hreflangEn).toBeAttached();
      await expect(hreflangEs).toBeAttached();
      await expect(hreflangDefault).toBeAttached();
    });

    test('English page should have og:locale set to en_US', async ({
      page,
    }) => {
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

    test('Spanish page should have proper title', async ({ page }) => {
      await page.goto(spanishPath(Route.Home));
      await expect(page).toHaveTitle(/Jerna Digital/);
    });

    test('Spanish about page should have unique meta tags', async ({
      page,
    }) => {
      await page.goto(spanishPath(Route.About));

      const title = await page.title();
      expect(title).toContain('Jerna Digital');
    });
  });

  test.describe('robots.txt', () => {
    test('should contain only standard directives', async ({ request }) => {
      const response = await request.get('/robots.txt');
      expect(response.ok()).toBeTruthy();
      const body = await response.text();
      expect(body).not.toContain('Content-Signal');
      expect(body).toMatch(/User-agent/i);
      expect(body).toMatch(/Allow/i);
    });
  });

  test.describe('OG meta tag quality', () => {
    const enPages = [
      { path: Route.Home, name: 'home' },
      { path: Route.About, name: 'about' },
      { path: Route.Services, name: 'services' },
      { path: Route.Contact, name: 'contact' },
      { path: Route.Portfolio, name: 'portfolio' },
    ];

    const esPages = [
      { path: spanishPath(Route.Home), name: 'home (es)' },
      { path: spanishPath(Route.About), name: 'about (es)' },
      { path: spanishPath(Route.Services), name: 'services (es)' },
      { path: spanishPath(Route.Contact), name: 'contact (es)' },
      { path: spanishPath(Route.Portfolio), name: 'portfolio (es)' },
    ];

    for (const { path, name } of [...enPages, ...esPages]) {
      test(`${name} page should have og:image as absolute URL`, async ({
        page,
      }) => {
        await page.goto(path);
        const ogImage = await page
          .locator('meta[property="og:image"]')
          .getAttribute('content');
        expect(ogImage).toBeTruthy();
        expect(ogImage!).toMatch(/^https?:\/\//);
      });

      test(`${name} page should have og:title length 40-65`, async ({
        page,
      }) => {
        await page.goto(path);
        const ogTitle = await page
          .locator('meta[property="og:title"]')
          .getAttribute('content');
        expect(ogTitle).toBeTruthy();
        expect(ogTitle!.length).toBeGreaterThanOrEqual(40);
        expect(ogTitle!.length).toBeLessThanOrEqual(65);
      });

      test(`${name} page should have og:description length 110-160`, async ({
        page,
      }) => {
        await page.goto(path);
        const ogDescription = await page
          .locator('meta[property="og:description"]')
          .getAttribute('content');
        expect(ogDescription).toBeTruthy();
        expect(ogDescription!.length).toBeGreaterThanOrEqual(110);
        expect(ogDescription!.length).toBeLessThanOrEqual(160);
      });

      test(`${name} page should have og:image dimensions`, async ({ page }) => {
        await page.goto(path);
        const ogWidth = page.locator('meta[property="og:image:width"]');
        const ogHeight = page.locator('meta[property="og:image:height"]');
        await expect(ogWidth).toHaveAttribute('content', '1200');
        await expect(ogHeight).toHaveAttribute('content', '630');
      });
    }

    test('canonical og image asset should be 1200x630', async ({
      page,
      request,
    }) => {
      await page.goto(Route.Home);

      const ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute('content');

      expect(ogImage).toBeTruthy();
      const ogImageUrl = new URL(ogImage!);
      expect(ogImageUrl.pathname).toBe('/og-image.png');

      const imageResponse = await request.get(ogImageUrl.pathname);
      expect(imageResponse.ok()).toBeTruthy();

      const imageBuffer = await imageResponse.body();
      const { width, height } = readPngDimensions(imageBuffer);

      expect(width).toBe(1200);
      expect(height).toBe(630);
    });
  });
});

test.describe('Font Loading', () => {
  test('should not request fonts from Google Fonts CDN', async ({ page }) => {
    const googleFontsRequests: string[] = [];

    page.on('request', (request) => {
      const url = request.url();
      if (
        url.includes('fonts.googleapis.com') ||
        url.includes('fonts.gstatic.com')
      ) {
        googleFontsRequests.push(url);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(googleFontsRequests).toHaveLength(0);
  });
});
