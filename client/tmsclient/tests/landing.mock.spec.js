// Import our custom test setup instead of the default Playwright test
import { test, expect } from './fixtures/tmsFixtures';

test.describe('TMS Landing Page - Mocking & Fixtures Demo', () => {
  
  // Notice we request `mockedLandingPage` instead of `page`
  // This automatically triggers the fixture we wrote, applying our network mock
  test('should display mocked practice sessions from intercepted API call', async ({ mockedLandingPage }) => {
    
    // Check that the page loaded by verifying the title
    await expect(mockedLandingPage.locator('h1.lp-hero__title')).toBeVisible();

    // The fixture intercepted the API call and injected our fake "Mockday" and "Testday" data.
    // Let's verify that the React frontend successfully rendered the mocked data!
    
    const mockdayCard = mockedLandingPage.locator('h3.lp-practice-card__day', { hasText: 'Mockday' });
    await expect(mockdayCard).toBeVisible();

    const mockdayType = mockedLandingPage.locator('span.lp-practice-card__type', { hasText: 'Mocked Fixture Practice' });
    await expect(mockdayType).toBeVisible();

    const testdayCard = mockedLandingPage.locator('h3.lp-practice-card__day', { hasText: 'Testday' });
    await expect(testdayCard).toBeVisible();

    const testdayType = mockedLandingPage.locator('span.lp-practice-card__type', { hasText: 'Automated E2E Practice' });
    await expect(testdayType).toBeVisible();
    
  });
});
