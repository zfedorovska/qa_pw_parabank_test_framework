import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavBar } from '../../../src/ui/components/NavBar.js';
import { BillPayPage } from '../../../src/ui/pages/BillPayPage.js';

test('Bill Pay happy path', async ({ loggedInPage: page }) => {
  allure.severity?.('critical');

  const nav = new NavBar(page);
  const bill = new BillPayPage(page);

  await nav.go.billPay();
  await bill.paySimple('123456', '10.50', 0);
  await bill.expectSuccess();
});
