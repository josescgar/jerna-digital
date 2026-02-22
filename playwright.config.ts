import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: process.env['CI'] ? 'github' : 'list',
  timeout: 15000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
    actionTimeout: 5000,
    navigationTimeout: 15000,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 14'] },
    },
  ],
  webServer: {
    // Ensure `dist/` is fresh before running E2E.
    // Use Astro's built-in preview server on the expected port.
    command:
      'npm run build && exec npx astro preview --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321/index.html',
    reuseExistingServer: false,
    // Build + preview can take longer than just starting the server.
    timeout: 120000,
  },
});
