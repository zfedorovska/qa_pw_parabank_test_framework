import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavigationBar } from '../../../src/ui/components/NavigationBar.js';
import { BillPayPage } from '../../../src/ui/pages/BillPayPage.js';

test('Bill Pay happy path', async ({ loggedInPage: page }) => {
  allure.severity?.('critical');

  const nav = new NavigationBar(page);
  const bill = new BillPayPage(page);

  const payeeAccountNumber = '123456';
  const paymentAmount = '10.50';
  const fromAccountIndex = 0;

  await nav.go.billPay();
  await bill.paySimple(payeeAccountNumber, paymentAmount, fromAccountIndex);
  await bill.expectSuccess();
});
