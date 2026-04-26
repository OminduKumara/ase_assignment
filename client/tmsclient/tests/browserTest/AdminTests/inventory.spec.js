import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/browserTest/storage/admin.json' });

test('Inventory flow - register, issue, and return assets', async ({ page }) => {
  await page.goto('/admin');

  await page.getByRole('button', { name: 'Inventory' }).click();

  await page.getByRole('textbox', { name: 'Asset Name' })
    .fill('Tennis balls');

  await page.getByRole('textbox', { name: 'Category' })
    .fill('Dunlop');

  await page.getByRole('button', { name: 'Register Item' }).click();

  await expect(
    page.getByRole('cell', { name: 'Tennis balls' }).first()
  ).toBeVisible();


  const issueRow1 = page
    .getByRole('row')
    .filter({ hasText: 'Dunlop red can' })
    .first();

  await issueRow1.click();

  await page.getByRole('textbox', { name: 'Member Username' })
    .fill('test');

  await page.getByRole('textbox', { name: 'Reference / Details' })
    .fill('test request');

  await page.getByRole('button', { name: 'CONFIRM ISSUE' }).click();

  const proceedBtn = page.getByRole('button', { name: 'PROCEED' }).first();
  if (await proceedBtn.isVisible()) {
    await proceedBtn.click();
  }

  const issueRow2 = page
    .getByRole('row')
    .filter({ hasText: 'Blue balls' })
    .first();

  await issueRow2.click();

  await page.getByRole('textbox', { name: 'Member Username' })
    .fill('test');

  await page.getByRole('textbox', { name: 'Reference / Details' })
    .fill('admin assigned issue');

  await page.getByRole('button', { name: 'CONFIRM ISSUE' }).click();

  
  const returnedTransaction = page.locator('li.tx-item', { hasText: 'test request' }).first();
  const returnBtn = returnedTransaction.getByRole('button', { name: 'RETURN ASSET' });
  await expect(returnBtn).toBeVisible();

  
  await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/inventory/return/') && resp.status() === 200),
    returnBtn.click(),
  ]);

});