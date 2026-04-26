import { test, expect } from './fixtures/tmsFixtures';

test.describe('TMS Inventory Page - Advanced Auth & Mocking Demo', () => {

  // We use the `authenticatedInventoryPage` fixture.
  // This automatically bypasses login and mocks 3 different API endpoints!
  test('should bypass login and display mocked inventory assets', async ({ authenticatedInventoryPage }) => {
    
    // Verify the page loaded by checking the header
    await expect(authenticatedInventoryPage.locator('h2', { hasText: 'Inventory Management' })).toBeVisible({ timeout: 2000 });

    // Because our fixture injected an Admin role into localStorage, 
    // the "Register Item" button should be visible (Role-Based Access Control bypass worked!)
    await expect(authenticatedInventoryPage.getByRole('button', { name: 'Register Item' })).toBeVisible();

    // Now let's verify that the Multi-API Network Mocking worked.
    // The table should contain our fake "Mocked Pro Racket"
    const racketRow = authenticatedInventoryPage.locator('tr', { hasText: 'Mocked Pro Racket' });
    await expect(racketRow).toBeVisible();
    await expect(racketRow.locator('td').nth(1)).toContainText('Racket');
    await expect(racketRow.locator('td').nth(3)).toContainText('15'); // Stock quantity

    // It should also contain our "Mocked Tennis Balls"
    const ballsRow = authenticatedInventoryPage.locator('tr', { hasText: 'Mocked Tennis Balls (Can)' });
    await expect(ballsRow).toBeVisible();
    await expect(ballsRow.locator('td').nth(3)).toContainText('100'); // Stock quantity

    // Finally, verify the mocked transactions API call populated the pending requests list
    const pendingRequest = authenticatedInventoryPage.locator('strong', { hasText: 'Pending Racket Request [Qty: 1]' });
    await expect(pendingRequest).toBeVisible();
  });
});
