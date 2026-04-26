# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browserTest\PlayerTests\inventoryRequest.spec.js >> Request equipment
- Location: tests\browserTest\PlayerTests\inventoryRequest.spec.js:5:1

# Error details

```
Error: page.goto: NS_ERROR_CONNECTION_REFUSED
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.use({ storageState: 'tests/browserTest/storage/player.json' });
  4  | 
  5  | test('Request equipment', async ({ page }) => {
> 6  |   await page.goto('/');
     |              ^ Error: page.goto: NS_ERROR_CONNECTION_REFUSED
  7  | 
  8  |   const dashboardBtn = page.getByRole('button', { name: /dashboard/i });
  9  |   await expect(dashboardBtn).toBeVisible();
  10 |   await dashboardBtn.click();
  11 | 
  12 |   const requestBtn = page.getByRole('button', { name: /Equipment Inventory Request/i });
  13 |   await expect(requestBtn).toBeVisible();
  14 | 
  15 |   await requestBtn.click();
  16 | 
  17 |   await page.getByText(/Dunlop red can/i).click();
  18 | 
  19 |   await page.getByRole('textbox', { name: /Reference \/ Details/i })
  20 |     .fill('new request');
  21 | 
  22 |   await page.getByRole('button', { name: /SUBMIT REQUEST/i }).click();
  23 | });
```