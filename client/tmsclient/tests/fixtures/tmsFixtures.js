import { test as base, expect } from '@playwright/test';

// Define custom fixtures by extending the base test
export const test = base.extend({
  // 1. Existing Fixture for Landing Page Mocking
  mockedLandingPage: async ({ page }, use) => {
    await page.route('**/practicesessions', async (route) => {
      const mockData = [
        {
          dayOfWeek: 'Mockday',
          startTime: '10:00 AM',
          endTime: '12:00 PM',
          sessionType: 'Mocked Fixture Practice'
        },
        {
          dayOfWeek: 'Testday',
          startTime: '2:00 PM',
          endTime: '4:00 PM',
          sessionType: 'Automated E2E Practice'
        }
      ];
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
    });

    await page.goto('http://localhost:5173/');
    await use(page);
  },

  // 2. NEW: Advanced Authentication Fixture + Inventory Mocking
  authenticatedInventoryPage: async ({ page }, use) => {
    // Inject fake login credentials into the browser to completely bypass the login screen
    await page.addInitScript(() => {
      window.localStorage.setItem('token', 'fake-jwt-token-12345');
      window.localStorage.setItem('user', JSON.stringify({
        id: 99,
        username: 'AdminTestUser',
        role: 'Admin'
      }));
    });

    // Intercept the FIRST API call: The Inventory List (Exact Match)
    await page.route(/.+\/inventory$/, async (route) => {
      if (route.request().resourceType() === 'document') return route.continue();
      const mockInventory = [
        { id: 1, name: 'Mocked Pro Racket', category: 'Racket', quantity: 15, condition: 'New' },
        { id: 2, name: 'Mocked Tennis Balls (Can)', category: 'Balls', quantity: 100, condition: 'Good' }
      ];
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockInventory) });
    });

    // Intercept the SECOND API call: The Transactions List
    await page.route(/.+\/inventory\/transactions$/, async (route) => {
      if (route.request().resourceType() === 'document') return route.continue();
      const mockTransactions = [
        { id: 1, inventoryItemId: 1, comment: 'Pending Racket Request [Qty: 1]', quantityChanged: 0, issuedToUserId: 99 }
      ];
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockTransactions) });
    });

    // Intercept the THIRD API call: The Returned Logs
    await page.route(/.+\/inventory\/returned-transactions$/, async (route) => {
      if (route.request().resourceType() === 'document') return route.continue();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    });

    // Navigate directly to the protected page, bypassing login entirely!
    await page.goto('http://localhost:5173/inventory');
    
    // Pass the fully authenticated and mocked page to the test
    await use(page);
  }
});

export { expect };
