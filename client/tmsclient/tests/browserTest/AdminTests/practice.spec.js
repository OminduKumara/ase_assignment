import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/browserTest/storage/admin.json' });

test('Manage practice sessions (add, edit, delete)', async ({ page }) => {
  const runId = Date.now();

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: /dashboard/i }).click();

  await page.getByRole('button', { name: /Practice/i }).click();

  await page.getByRole('button', { name: /^Add Session$/i }).click();

  await page.getByRole('combobox').selectOption('Monday');

  await page.getByRole('textbox', { name: /3:00 PM/i }).fill('3:00 PM');
  await page.getByRole('textbox', { name: /6:30 PM/i }).fill('7:00 PM');

  const sessionName = `Team Practice ${runId}`;
  await page.getByRole('textbox', { name: /Team Practice/i }).fill(sessionName);

  await page.getByRole('button', { name: /^Add Session$/i }).click();

  await expect(page.getByText(sessionName)).toBeVisible();

  const row = page.getByRole('row', { name: new RegExp(runId.toString()) });

  await expect(row).toBeVisible();

  await row.getByRole('button', { name: /Edit/i }).click();

  await page.getByRole('combobox').selectOption('Thursday');
  await page.getByRole('button', { name: /Update/i }).click();

  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  await row.getByRole('button', { name: /Delete/i }).click();

  await expect(page.getByText(sessionName)).not.toBeVisible();
});