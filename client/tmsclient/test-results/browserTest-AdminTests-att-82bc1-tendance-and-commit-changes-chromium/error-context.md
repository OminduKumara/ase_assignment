# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browserTest\AdminTests\attendence.spec.js >> Mark attendance and commit changes
- Location: tests\browserTest\AdminTests\attendence.spec.js:5:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.use({ storageState: 'tests/browserTest/storage/admin.json' });
  4  | 
  5  | test('Mark attendance and commit changes', async ({ page }) => {
> 6  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
  7  |   await page.waitForLoadState('networkidle');
  8  | 
  9  |   await page.getByRole('button', { name: /dashboard/i }).click();
  10 | 
  11 |   const attendanceBtn = page.getByRole('button', { name: /Attendance/i });
  12 |   await expect(attendanceBtn).toBeVisible();
  13 |   await attendanceBtn.click();
  14 | 
  15 |   await page.getByRole('combobox').selectOption('37');
  16 | 
  17 |   const today = new Date().toISOString().split('T')[0];
  18 |   await page.getByRole('textbox').fill(today);
  19 | 
  20 |   await page.getByRole('button', { name: /Load Records/i }).click();
  21 | 
  22 | 
  23 |   const ominduRow = page.getByRole('row', { name: /Omindu/i });
  24 |   await expect(ominduRow).toBeVisible();
  25 |   await ominduRow.getByRole('checkbox').check();
  26 | 
  27 | 
  28 |   page.once('dialog', dialog => dialog.accept());
  29 |   await page.getByRole('button', { name: /Commit Attendance Changes/i }).click();
  30 | 
  31 |   await expect(ominduRow.getByRole('checkbox')).toBeChecked();
  32 | 
  33 |   
  34 | });
```