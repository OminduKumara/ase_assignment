# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browserTest\AdminTests\reports.spec.js >> Generate reports
- Location: tests\browserTest\AdminTests\reports.spec.js:5:1

# Error details

```
Error: page.goto: NS_ERROR_CONNECTION_REFUSED
Call log:
  - navigating to "http://localhost:5173/admin", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading [level=1] [ref=e5]
  - paragraph
  - paragraph
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | 
  3  | test.use({ storageState: 'tests/browserTest/storage/admin.json' });
  4  | 
  5  | test('Generate reports', async ({ page }) => {
> 6  |   await page.goto('/admin');
     |              ^ Error: page.goto: NS_ERROR_CONNECTION_REFUSED
  7  | 
  8  |   await page.getByRole('button', { name: 'Reports' }).click();
  9  | 
  10 |   const inputs = page.getByRole('textbox');
  11 | 
  12 |   await inputs.first().fill('2026-02-10');
  13 |   await inputs.nth(1).fill('2026-03-30');
  14 | 
  15 |   await page.getByRole('button', { name: 'Generate Analytics' }).click();
  16 | });
```