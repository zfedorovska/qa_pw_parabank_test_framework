import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { expect, testStep } from '../../../src/common/helpers/pwHelpers.js';
import { AuthPage } from '../../../src/ui/pages/AuthPage.js';

test('User can register (positive)', async ({ page }) => {
  allure.severity?.('critical');

  const username = `pb_${Date.now()}`;
  const password = 'Test1234!';

  const auth = new AuthPage(page);

  await auth.openHome();

  await testStep('Open Register form', async () => {
    await auth.openRegister();
    await expect(page.getByRole('heading', { name: 'Signing up is easy!' })).toBeVisible();
  });

  await testStep('Fill and submit registration', async () => {
    await page.fill('#customer\\.firstName', 'John');
    await page.fill('#customer\\.lastName', 'Doe');
    await page.fill('#customer\\.address\\.street', '1 Main St');
    await page.fill('#customer\\.address\\.city', 'City');
    await page.fill('#customer\\.address\\.state', 'CA');
    await page.fill('#customer\\.address\\.zipCode', '90001');
    await page.fill('#customer\\.phoneNumber', '5551112222');
    await page.fill('#customer\\.ssn', '123-45-6789');
    await page.fill('#customer\\.username', username);
    await page.fill('#customer\\.password', password);
    await page.fill('#repeatedPassword', password);
    await page.click('input[value="Register"]');
  });

  await testStep('Expect success banner', async () => {
    await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully');
  });
});

test('Register negative (password mismatch)', async ({ page }) => {
  allure.severity?.('minor');

  await testStep('Open Register form', async () => {
    await page.goto('https://parabank.parasoft.com/parabank/register.htm');
    await expect(page.getByRole('heading', { name: 'Signing up is easy!' })).toBeVisible();
  });

  await testStep('Submit mismatched passwords', async () => {
    await page.fill('#customer\\.firstName', 'Jane');
    await page.fill('#customer\\.lastName', 'Smith');
    await page.fill('#customer\\.username', `pb_${Date.now()}`);
    await page.fill('#customer\\.password', 'Test1234!');
    await page.fill('#repeatedPassword', 'Other123!');
    await page.click('input[value="Register"]');
  });

  await testStep('Expect validation error', async () => {
    await expect(page.locator('#repeatedPassword\\.errors')).toHaveText('Passwords did not match.');
  });
});
