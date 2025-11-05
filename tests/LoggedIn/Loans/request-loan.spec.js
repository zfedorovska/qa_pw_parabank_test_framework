import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavigationBar } from '../../../src/ui/components/NavigationBar.js';
import { RequestLoanPage } from '../../../src/ui/pages/RequestLoanPage.js';

const cases = [
  { amount: '100',  down: '10',  severity: 'normal'   },
  { amount: '5000', down: '100', severity: 'critical' },
  { amount: '0',    down: '0',   severity: 'minor'    },
];

cases.forEach(({ amount, down, severity }) => {
  test(`Request Loan amount=${amount} down=${down}`, async ({ loggedInPage: page }) => {
    allure.severity?.(severity);

    const nav = new NavigationBar(page);
    const loan = new RequestLoanPage(page);

    await nav.go.requestLoan();
    await loan.apply(amount, down, 0);
    await loan.expectDecision();
  });
});
