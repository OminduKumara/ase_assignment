# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.mock.spec.js >> TMS Inventory Page - Advanced Auth & Mocking Demo >> should bypass login and display mocked inventory assets
- Location: tests\inventory.mock.spec.js:7:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/inventory
Call log:
  - navigating to "http://localhost:5173/inventory", waiting until "load"

```

# Test source

```ts
  1  | import { test as base, expect } from '@playwright/test';
  2  | 
  3  | // Define custom fixtures by extending the base test
  4  | export const test = base.extend({
  5  |   // 1. Existing Fixture for Landing Page Mocking
  6  |   mockedLandingPage: async ({ page }, use) => {
  7  |     await page.route('**/practicesessions', async (route) => {
  8  |       const mockData = [
  9  |         {
  10 |           dayOfWeek: 'Mockday',
  11 |           startTime: '10:00 AM',
  12 |           endTime: '12:00 PM',
  13 |           sessionType: 'Mocked Fixture Practice'
  14 |         },
  15 |         {
  16 |           dayOfWeek: 'Testday',
  17 |           startTime: '2:00 PM',
  18 |           endTime: '4:00 PM',
  19 |           sessionType: 'Automated E2E Practice'
  20 |         }
  21 |       ];
  22 |       await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
  23 |     });
  24 | 
  25 |     await page.goto('http://localhost:5173/');
  26 |     await use(page);
  27 |   },
  28 | 
  29 |   // 2. NEW: Advanced Authentication Fixture + Inventory Mocking
  30 |   authenticatedInventoryPage: async ({ page }, use) => {
  31 |     // Inject fake login credentials into the browser to completely bypass the login screen
  32 |     await page.addInitScript(() => {
  33 |       window.localStorage.setItem('token', 'fake-jwt-token-12345');
  34 |       window.localStorage.setItem('user', JSON.stringify({
  35 |         id: 99,
  36 |         username: 'AdminTestUser',
  37 |         role: 'Admin'
  38 |       }));
  39 |     });
  40 | 
  41 |     // Intercept the FIRST API call: The Inventory List (Exact Match)
  42 |     await page.route(/.+\/inventory$/, async (route) => {
  43 |       if (route.request().resourceType() === 'document') return route.continue();
  44 |       const mockInventory = [
  45 |         { id: 1, name: 'Mocked Pro Racket', category: 'Racket', quantity: 15, condition: 'New' },
  46 |         { id: 2, name: 'Mocked Tennis Balls (Can)', category: 'Balls', quantity: 100, condition: 'Good' }
  47 |       ];
  48 |       await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockInventory) });
  49 |     });
  50 | 
  51 |     // Intercept the SECOND API call: The Transactions List
  52 |     await page.route(/.+\/inventory\/transactions$/, async (route) => {
  53 |       if (route.request().resourceType() === 'document') return route.continue();
  54 |       const mockTransactions = [
  55 |         { id: 1, inventoryItemId: 1, comment: 'Pending Racket Request [Qty: 1]', quantityChanged: 0, issuedToUserId: 99 }
  56 |       ];
  57 |       await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockTransactions) });
  58 |     });
  59 | 
  60 |     // Intercept the THIRD API call: The Returned Logs
  61 |     await page.route(/.+\/inventory\/returned-transactions$/, async (route) => {
  62 |       if (route.request().resourceType() === 'document') return route.continue();
  63 |       await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  64 |     });
  65 | 
  66 |     // Navigate directly to the protected page, bypassing login entirely!
> 67 |     await page.goto('http://localhost:5173/inventory');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/inventory
  68 |     
  69 |     // Pass the fully authenticated and mocked page to the test
  70 |     await use(page);
  71 |   }
  72 | });
  73 | 
  74 | export { expect };
  75 | 
```