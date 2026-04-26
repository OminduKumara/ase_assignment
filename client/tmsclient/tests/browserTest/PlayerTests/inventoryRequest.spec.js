import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/browserTest/storage/player.json' });

test('Request equipment', async ({ page }) => {
  await page.goto('/');

  const dashboardBtn = page.getByRole('button', { name: /dashboard/i });
  await expect(dashboardBtn).toBeVisible();
  await dashboardBtn.click();

  const requestBtn = page.getByRole('button', { name: /Equipment Inventory Request/i });
  await expect(requestBtn).toBeVisible();

  await requestBtn.click();

  await page.getByText(/Dunlop red can/i).click();

  await page.getByRole('textbox', { name: /Reference \/ Details/i })
    .fill('new request');

  await page.getByRole('button', { name: /SUBMIT REQUEST/i }).click();
});