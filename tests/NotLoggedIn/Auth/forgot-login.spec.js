import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { CustomerLookupPage } from '../../../src/ui/pages/CustomerLookupPage.js';

test('Forgot login info shows result page', async ({ page }) => {
  allure.severity?.('minor');

  const lookup = new CustomerLookupPage(page);

  await lookup.open();
  await lookup.submitLookup({
    firstName: 'John',
    lastName: 'Doe',
    street: '1 Main St',
    city: 'City',
    state: 'CA',
    zip: '90001',
    ssn: '123-45-6789',
  });
  await lookup.expectResultArea();
});
