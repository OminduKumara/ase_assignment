import { test } from '@playwright/test';

test.use({ storageState: 'tests/browserTest/storage/admin.json' });

test('Arena match flow', async ({ page }) => {
  await page.goto('/admin');

  await page.getByRole('button', { name: 'Arena' }).click();
  await page.getByRole('button', { name: 'Spring Championship' }).click();

  await page.getByRole('textbox', { name: 'Enter Athlete or Team Name' })
    .fill('Team3');

  await page.keyboard.press('Enter');
});