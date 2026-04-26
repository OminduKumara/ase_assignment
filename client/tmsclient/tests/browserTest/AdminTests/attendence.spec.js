import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/browserTest/storage/admin.json' });

test('Mark attendance and commit changes', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: /dashboard/i }).click();

  const attendanceBtn = page.getByRole('button', { name: /Attendance/i });
  await expect(attendanceBtn).toBeVisible();
  await attendanceBtn.click();

  await page.getByRole('combobox').selectOption('37');

  const today = new Date().toISOString().split('T')[0];
  await page.getByRole('textbox').fill(today);

  await page.getByRole('button', { name: /Load Records/i }).click();


  const ominduRow = page.getByRole('row', { name: /Omindu/i });
  await expect(ominduRow).toBeVisible();
  await ominduRow.getByRole('checkbox').check();


  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: /Commit Attendance Changes/i }).click();

  await expect(ominduRow.getByRole('checkbox')).toBeChecked();

  
});