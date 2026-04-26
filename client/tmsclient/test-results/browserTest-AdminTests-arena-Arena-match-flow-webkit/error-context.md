# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browserTest\AdminTests\arena.spec.js >> Arena match flow
- Location: tests\browserTest\AdminTests\arena.spec.js:5:1

# Error details

```
Error: page.goto: Could not connect to server
Call log:
  - navigating to "http://localhost:5173/admin", waiting until "load"

```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | 
  3  | test.use({ storageState: 'tests/browserTest/storage/admin.json' });
  4  | 
  5  | test('Arena match flow', async ({ page }) => {
> 6  |   await page.goto('/admin');
     |              ^ Error: page.goto: Could not connect to server
  7  | 
  8  |   await page.getByRole('button', { name: 'Arena' }).click();
  9  |   await page.getByRole('button', { name: 'Spring Championship' }).click();
  10 | 
  11 |   await page.getByRole('textbox', { name: 'Enter Athlete or Team Name' })
  12 |     .fill('Team3');
  13 | 
  14 |   await page.keyboard.press('Enter');
  15 | });
```