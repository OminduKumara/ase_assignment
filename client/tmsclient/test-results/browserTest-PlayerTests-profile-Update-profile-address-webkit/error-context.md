# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browserTest\PlayerTests\profile.spec.js >> Update profile address
- Location: tests\browserTest\PlayerTests\profile.spec.js:5:1

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
  3  | test.use({ storageState: 'tests/browserTest/storage/player.json' });
  4  | 
  5  | test('Update profile address', async ({ page }) => {
  6  |   const runId = Date.now();
  7  | 
> 8  |   await page.goto('/');
     |              ^ Error: page.goto: Could not connect to server
  9  |   await page.waitForLoadState('networkidle');
  10 | 
  11 |   const dashboardBtn = page.getByRole('button', { name: /dashboard/i });
  12 |   await expect(dashboardBtn).toBeVisible();
  13 |   await dashboardBtn.click();
  14 | 
  15 |   const profileBtn = page.getByRole('button', { name: /Personal Profile/i });
  16 |   await expect(profileBtn).toBeVisible();
  17 |   await profileBtn.click();
  18 | 
  19 |   const address = page.getByRole('textbox', { name: /Address/i });
  20 | 
  21 |   await address.fill(`Address A ${runId}`);
  22 |   await page.getByRole('button', { name: /Save Changes/i }).click();
  23 | 
  24 |   await expect(page.getByText(/Profile updated successfully/i)).toBeVisible();
  25 | 
  26 |   await address.fill(`Address B ${runId}`);
  27 |   await page.getByRole('button', { name: /Save Changes/i }).click();
  28 | 
  29 |   await expect(page.getByText(/Profile updated successfully/i)).toBeVisible();
  30 | });
```