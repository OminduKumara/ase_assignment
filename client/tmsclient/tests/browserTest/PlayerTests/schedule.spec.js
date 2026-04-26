import { test } from '@playwright/test';

test.use({ storageState: 'tests/browserTest/storage/player.json' });

test('View practice schedule', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'View Practice Schedule' }).click();
});