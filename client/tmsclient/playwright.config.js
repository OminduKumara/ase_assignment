import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail CI on accidental test.only */
  forbidOnly: !!process.env.CI,

  /* Retry strategy */
  retries: process.env.CI ? 2 : 0,

  /* Parallel workers */
  workers: process.env.CI ? 1 : undefined,

  /* Reporters (combined both configs) */
  reporter: [
    ['./scripts/student-reporter.js'],
    ['html', { open: 'never' }],
  ],

  /* Shared settings */
  use: {
    /* Default baseURL (you can switch via env if needed) */
    baseURL: process.env.BASE_URL || 'http://localhost:5173',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Projects */
  projects: [
    // --- Setup projects ---
    {
      name: 'setup admin',
      testMatch: /admin\.setup\.js/,
    },
    {
      name: 'setup player',
      testMatch: /player\.setup\.js/,
    },

    // --- Browsers ---
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.spec\.js/,
      dependencies: ['setup admin', 'setup player'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /.*\.spec\.js/,
      dependencies: ['setup admin', 'setup player'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: /.*\.spec\.js/,
      dependencies: ['setup admin', 'setup player'],
    },
  ],
});