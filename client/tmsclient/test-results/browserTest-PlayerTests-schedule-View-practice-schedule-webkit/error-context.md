# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browserTest\PlayerTests\schedule.spec.js >> View practice schedule
- Location: tests\browserTest\PlayerTests\schedule.spec.js:5:1

# Error details

```
Error: page.goto: Could not connect to server
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  1 | import { test } from '@playwright/test';
  2 | 
  3 | test.use({ storageState: 'tests/browserTest/storage/player.json' });
  4 | 
  5 | test('View practice schedule', async ({ page }) => {
> 6 |   await page.goto('/');
    |              ^ Error: page.goto: Could not connect to server
  7 | 
  8 |   await page.getByRole('link', { name: 'View Practice Schedule' }).click();
  9 | });
```