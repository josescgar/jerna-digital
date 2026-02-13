/**
 * Generates the OG image (1200x630) for social sharing.
 * Uses Playwright to render an HTML template and screenshot it.
 *
 * Usage: npx tsx scripts/generate-og-image.ts
 * Output: public/og-image.png
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../public/og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      background: #0a0a0b;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    /* Gradient accent orb */
    .orb {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.3;
    }
    .orb-1 {
      top: -150px;
      right: -100px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
    }
    .orb-2 {
      bottom: -200px;
      left: -100px;
      background: linear-gradient(135deg, #16a34a, #22c55e);
      opacity: 0.15;
    }

    /* Grid pattern */
    .grid-pattern {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 64px 64px;
    }

    .content {
      position: relative;
      z-index: 1;
      padding: 0 80px;
    }

    .logo-text {
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 24px;
      color: #22c55e;
      margin-bottom: 40px;
      letter-spacing: -0.02em;
    }

    h1 {
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 56px;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 20px;
    }

    h1 .gradient {
      background: linear-gradient(135deg, #22c55e, #16a34a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 22px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.5;
      max-width: 700px;
    }

    /* Bottom border accent */
    .accent-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #22c55e, #16a34a, transparent);
    }
  </style>
</head>
<body>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="grid-pattern"></div>

  <div class="content">
    <div class="logo-text">Jerna Digital</div>
    <h1><span class="gradient">AI-First</span> Technical Leadership</h1>
    <p class="subtitle">Fractional CTO & Technical Consulting for Startups</p>
  </div>

  <div class="accent-bar"></div>
</body>
</html>`;

async function main(): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
  });

  await page.setContent(html, { waitUntil: 'networkidle' });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());

  await page.screenshot({
    path: outputPath,
    type: 'png',
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  });

  await browser.close();
  console.log(`OG image saved to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
