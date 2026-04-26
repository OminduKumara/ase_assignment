import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/browserTest/storage/admin.json' });

test('Create tournament', async ({ page }) => {
  await page.goto('/admin');

  // Open create tournament form
  await page.getByRole('button', { name: '+ New Tournament' }).click();

  // Fill tournament details
  await page.getByRole('textbox', { name: 'e.g., Spring Championship' })
    .fill('Test');

  await page.getByRole('textbox', { name: 'Tournament description' })
    .fill('Test');

  // Dates (from your recording - required in UI)
  await page.locator('input[name="startDate"]')
    .fill('2027-04-26T08:00');

  await page.locator('input[name="endDate"]')
    .fill('2027-04-30T19:00');

  // Create tournament
  await page.getByRole('button', { name: 'Create Tournament' }).click();

  // Assertion: tournament appears
  await expect(page.getByText('Test')).toBeVisible();
});