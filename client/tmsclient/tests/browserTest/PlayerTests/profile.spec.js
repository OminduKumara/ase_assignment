import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/browserTest/storage/player.json' });

test('Update profile address', async ({ page }) => {
  const runId = Date.now();

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const dashboardBtn = page.getByRole('button', { name: /dashboard/i });
  await expect(dashboardBtn).toBeVisible();
  await dashboardBtn.click();

  const profileBtn = page.getByRole('button', { name: /Personal Profile/i });
  await expect(profileBtn).toBeVisible();
  await profileBtn.click();

  const address = page.getByRole('textbox', { name: /Address/i });

  await address.fill(`Address A ${runId}`);
  await page.getByRole('button', { name: /Save Changes/i }).click();

  await expect(page.getByText(/Profile updated successfully/i)).toBeVisible();

  await address.fill(`Address B ${runId}`);
  await page.getByRole('button', { name: /Save Changes/i }).click();

  await expect(page.getByText(/Profile updated successfully/i)).toBeVisible();
});