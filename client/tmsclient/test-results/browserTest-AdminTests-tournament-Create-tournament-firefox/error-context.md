# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browserTest\AdminTests\tournament.spec.js >> Create tournament
- Location: tests\browserTest\AdminTests\tournament.spec.js:5:1

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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.use({ storageState: 'tests/browserTest/storage/admin.json' });
  4  | 
  5  | test('Create tournament', async ({ page }) => {
> 6  |   await page.goto('/admin');
     |              ^ Error: page.goto: NS_ERROR_CONNECTION_REFUSED
  7  | 
  8  |   // Open create tournament form
  9  |   await page.getByRole('button', { name: '+ New Tournament' }).click();
  10 | 
  11 |   // Fill tournament details
  12 |   await page.getByRole('textbox', { name: 'e.g., Spring Championship' })
  13 |     .fill('Test');
  14 | 
  15 |   await page.getByRole('textbox', { name: 'Tournament description' })
  16 |     .fill('Test');
  17 | 
  18 |   // Dates (from your recording - required in UI)
  19 |   await page.locator('input[name="startDate"]')
  20 |     .fill('2027-04-26T08:00');
  21 | 
  22 |   await page.locator('input[name="endDate"]')
  23 |     .fill('2027-04-30T19:00');
  24 | 
  25 |   // Create tournament
  26 |   await page.getByRole('button', { name: 'Create Tournament' }).click();
  27 | 
  28 |   // Assertion: tournament appears
  29 |   await expect(page.getByText('Test')).toBeVisible();
  30 | });
```