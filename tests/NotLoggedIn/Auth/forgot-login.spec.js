import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { expect, testStep } from '../../../src/common/helpers/pwHelpers.js';

test('Forgot login info shows result page', async ({ page }) => {
  allure.severity?.('minor');

  await testStep('Open "Forgot login info?" page', async () => {
    await page.goto('https://parabank.parasoft.com/parabank/lookup.htm');
    await expect(page.getByRole('heading', { name: /Customer Lookup/i })).toBeVisible();
  });

  await testStep('Submit lookup form', async () => {
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#address\\.street', '1 Main St');
    await page.fill('#address\\.city', 'City');
    await page.fill('#address\\.state', 'CA');
    await page.fill('#address\\.zipCode', '90001');
    await page.fill('#ssn', '123-45-6789');
    await page.click('input[value="Find My Login Info"]');
  });

  await testStep('Expect result area', async () => {
    await expect(page.locator('#rightPanel'))
    // eslint-disable-next-line max-len
    .toContainText(/(Customer Lookup|The customer information provided could not be found\.)/i);

  });
});
