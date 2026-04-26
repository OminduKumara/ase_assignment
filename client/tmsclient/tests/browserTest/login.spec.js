import { test, expect } from '@playwright/test';

test('Player signup → Admin approval → Player login', async ({ browser }) => {

  
  const playerContext = await browser.newContext();
  const playerPage = await playerContext.newPage();

  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();

  const domains = ['my.sliit.lk', 'sliit.lk'];
  const domain = domains[Math.floor(Math.random() * domains.length)];

  const email = `it${Date.now()}@${domain}`;

  const username = `QA_User_${Date.now()}`;
  const password = 'QA@12345';
  const identity = `IT${Date.now()}`;


  // PLAYER SIGNUP
  await playerPage.goto('https://csp-group-4.vercel.app/');

  await playerPage.getByRole('button', { name: 'Login' }).click();
  await playerPage.getByRole('button', { name: 'Sign Up' }).first().click();

  await playerPage.getByRole('textbox', { name: 'Choose a username' }).fill(username);
  await playerPage.getByRole('textbox', { name: 'Your identity number' }).fill(identity);
  await playerPage.getByRole('textbox', { name: 'Your email address' }).fill(email);
  await playerPage.getByRole('textbox', { name: 'Create a password' }).fill(password);
  await playerPage.getByRole('textbox', { name: 'Confirm your password' }).fill(password);

  await playerPage.getByRole('button', { name: 'Create Account' }).click();


  // STEP 2: ADMIN LOGIN
  await adminPage.goto('https://csp-group-4.vercel.app/');

  await adminPage.getByRole('button', { name: 'Login' }).click();
  await adminPage.getByRole('textbox', { name: 'Enter email or ID' }).fill('admin@sliit.lk');
  await adminPage.getByRole('textbox', { name: 'Enter password' }).fill('admin123');
  await adminPage.locator('form').getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard/admin panel
  await expect(adminPage).toHaveURL(/dashboard|admin/);

  // ADMIN APPROVES PLAYER

  await adminPage.getByRole('button', { name: 'Queue' }).click();

  adminPage.once('dialog', async dialog => {
    console.log(`Dialog: ${dialog.message()}`);
    await dialog.accept();
  });
  
  const userRow = adminPage.locator(`text=${email}`);

  await expect(userRow).toBeVisible();

  const row = adminPage.locator('tr').filter({ hasText: email });

  await row.getByRole('button', { name: 'Approve' }).click();
  await expect(adminPage.locator('text=Approved')).toBeVisible();
  
  // PLAYER LOGIN AFTER APPROVAL

  await playerPage.goto('https://csp-group-4.vercel.app/');

  await playerPage.getByRole('button', { name: 'Login' }).click();

await expect(
  playerPage.getByRole('textbox', { name: 'Enter email or ID' })
).toBeVisible();

await playerPage.getByRole('textbox', { name: 'Enter email or ID' }).fill(email);
await playerPage.getByRole('textbox', { name: 'Enter password' }).fill(password);

await playerPage.locator('form').getByRole('button', { name: 'Login' }).click();

// Verify login success 
await expect(playerPage.locator('text=Dashboard')).toBeVisible();


});