import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavBar } from '../../../src/ui/components/NavBar.js';
import { RequestLoanPage } from '../../../src/ui/pages/RequestLoanPage.js';

const cases = [
  { amount: '100',  down: '10',  severity: 'normal'   },
  { amount: '5000', down: '100', severity: 'critical' },
  { amount: '0',    down: '0',   severity: 'minor'    },
];

for (const c of cases) {
  test(`Request Loan amount=${c.amount} down=${c.down}`, async ({ loggedInPage: page }) => {
    allure.severity?.(c.severity);

    const nav = new NavBar(page);
    const loan = new RequestLoanPage(page);

    await nav.go.requestLoan();
    await loan.apply(c.amount, c.down, 0);
    await loan.expectDecision();
  });
}
