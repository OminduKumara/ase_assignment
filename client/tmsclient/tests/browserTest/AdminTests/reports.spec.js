import { test } from '@playwright/test';

test.use({ storageState: 'tests/browserTest/storage/admin.json' });

test('Generate reports', async ({ page }) => {
  await page.goto('/admin');

  await page.getByRole('button', { name: 'Reports' }).click();

  const inputs = page.getByRole('textbox');

  await inputs.first().fill('2026-02-10');
  await inputs.nth(1).fill('2026-03-30');

  await page.getByRole('button', { name: 'Generate Analytics' }).click();
});