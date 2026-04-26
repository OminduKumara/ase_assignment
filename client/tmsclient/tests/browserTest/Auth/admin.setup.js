import { test as setup, expect } from '@playwright/test';

const baseURL = 'https://csp-group-4.vercel.app/';

setup('admin auth state', async ({ page }) => {
  await page.goto(baseURL);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('textbox', { name: 'Enter email or ID' })
    .fill('admin@sliit.lk');

  await page.getByRole('textbox', { name: 'Enter password' })
    .fill('admin123');

  await page.locator('form').getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/admin/);

  await page.context().storageState({ path: 'storage/admin.json' });
});