# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browserTest\AdminTests\inventory.spec.js >> Inventory flow - register, issue, and return assets
- Location: tests\browserTest\AdminTests\inventory.spec.js:5:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/admin
Call log:
  - navigating to "http://localhost:5173/admin", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.use({ storageState: 'tests/browserTest/storage/admin.json' });
  4  | 
  5  | test('Inventory flow - register, issue, and return assets', async ({ page }) => {
> 6  |   await page.goto('/admin');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/admin
  7  | 
  8  |   await page.getByRole('button', { name: 'Inventory' }).click();
  9  | 
  10 |   await page.getByRole('textbox', { name: 'Asset Name' })
  11 |     .fill('Tennis balls');
  12 | 
  13 |   await page.getByRole('textbox', { name: 'Category' })
  14 |     .fill('Dunlop');
  15 | 
  16 |   await page.getByRole('button', { name: 'Register Item' }).click();
  17 | 
  18 |   await expect(
  19 |     page.getByRole('cell', { name: 'Tennis balls' }).first()
  20 |   ).toBeVisible();
  21 | 
  22 | 
  23 |   const issueRow1 = page
  24 |     .getByRole('row')
  25 |     .filter({ hasText: 'Dunlop red can' })
  26 |     .first();
  27 | 
  28 |   await issueRow1.click();
  29 | 
  30 |   await page.getByRole('textbox', { name: 'Member Username' })
  31 |     .fill('test');
  32 | 
  33 |   await page.getByRole('textbox', { name: 'Reference / Details' })
  34 |     .fill('test request');
  35 | 
  36 |   await page.getByRole('button', { name: 'CONFIRM ISSUE' }).click();
  37 | 
  38 |   const proceedBtn = page.getByRole('button', { name: 'PROCEED' }).first();
  39 |   if (await proceedBtn.isVisible()) {
  40 |     await proceedBtn.click();
  41 |   }
  42 | 
  43 |   const issueRow2 = page
  44 |     .getByRole('row')
  45 |     .filter({ hasText: 'Blue balls' })
  46 |     .first();
  47 | 
  48 |   await issueRow2.click();
  49 | 
  50 |   await page.getByRole('textbox', { name: 'Member Username' })
  51 |     .fill('test');
  52 | 
  53 |   await page.getByRole('textbox', { name: 'Reference / Details' })
  54 |     .fill('admin assigned issue');
  55 | 
  56 |   await page.getByRole('button', { name: 'CONFIRM ISSUE' }).click();
  57 | 
  58 |   
  59 |   const returnedTransaction = page.locator('li.tx-item', { hasText: 'test request' }).first();
  60 |   const returnBtn = returnedTransaction.getByRole('button', { name: 'RETURN ASSET' });
  61 |   await expect(returnBtn).toBeVisible();
  62 | 
  63 |   
  64 |   await Promise.all([
  65 |     page.waitForResponse(resp => resp.url().includes('/inventory/return/') && resp.status() === 200),
  66 |     returnBtn.click(),
  67 |   ]);
  68 | 
  69 | });
```