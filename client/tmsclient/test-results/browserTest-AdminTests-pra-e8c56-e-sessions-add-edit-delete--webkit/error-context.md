# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browserTest\AdminTests\practice.spec.js >> Manage practice sessions (add, edit, delete)
- Location: tests\browserTest\AdminTests\practice.spec.js:5:1

# Error details

```
Error: page.goto: Could not connect to server
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.use({ storageState: 'tests/browserTest/storage/admin.json' });
  4  | 
  5  | test('Manage practice sessions (add, edit, delete)', async ({ page }) => {
  6  |   const runId = Date.now();
  7  | 
> 8  |   await page.goto('/');
     |              ^ Error: page.goto: Could not connect to server
  9  |   await page.waitForLoadState('networkidle');
  10 | 
  11 |   await page.getByRole('button', { name: /dashboard/i }).click();
  12 | 
  13 |   await page.getByRole('button', { name: /Practice/i }).click();
  14 | 
  15 |   await page.getByRole('button', { name: /^Add Session$/i }).click();
  16 | 
  17 |   await page.getByRole('combobox').selectOption('Monday');
  18 | 
  19 |   await page.getByRole('textbox', { name: /3:00 PM/i }).fill('3:00 PM');
  20 |   await page.getByRole('textbox', { name: /6:30 PM/i }).fill('7:00 PM');
  21 | 
  22 |   const sessionName = `Team Practice ${runId}`;
  23 |   await page.getByRole('textbox', { name: /Team Practice/i }).fill(sessionName);
  24 | 
  25 |   await page.getByRole('button', { name: /^Add Session$/i }).click();
  26 | 
  27 |   await expect(page.getByText(sessionName)).toBeVisible();
  28 | 
  29 |   const row = page.getByRole('row', { name: new RegExp(runId.toString()) });
  30 | 
  31 |   await expect(row).toBeVisible();
  32 | 
  33 |   await row.getByRole('button', { name: /Edit/i }).click();
  34 | 
  35 |   await page.getByRole('combobox').selectOption('Thursday');
  36 |   await page.getByRole('button', { name: /Update/i }).click();
  37 | 
  38 |   page.once('dialog', async dialog => {
  39 |     await dialog.accept();
  40 |   });
  41 | 
  42 |   await row.getByRole('button', { name: /Delete/i }).click();
  43 | 
  44 |   await expect(page.getByText(sessionName)).not.toBeVisible();
  45 | });
```