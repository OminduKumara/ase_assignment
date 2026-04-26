import { test as setup, expect } from '@playwright/test';

const baseURL = 'https://csp-group-4.vercel.app/';

setup('player auth state', async ({ page }) => {
  await page.goto(baseURL);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('textbox', { name: 'Enter email or ID' })
    .fill('omindu@sliit.lk');

  await page.getByRole('textbox', { name: 'Enter password' })
    .fill('Omindu@2003');

  await page.locator('form').getByRole('button', { name: 'Login' }).click();

  await page.waitForLoadState('networkidle');

  await page.context().storageState({ path: 'storage/player.json' });
});