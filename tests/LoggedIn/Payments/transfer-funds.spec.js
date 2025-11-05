import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavigationBar } from '../../../src/ui/components/NavigationBar.js';
import { TransferFundsPage } from '../../../src/ui/pages/TransferFundsPage.js';

const cases = [
  { amount: '1',     severity: 'critical', isValid: true  },
  { amount: '25.50', severity: 'critical', isValid: true  },
  { amount: '0',     severity: 'minor',    isValid: false },
  { amount: '-5',    severity: 'minor',    isValid: false },
  { amount: 'abc',   severity: 'minor',    isValid: false },
];

cases.forEach(({ amount, severity, isValid }) => {
  test(`Transfer Funds amount="${amount}"`, async ({ loggedInPage: page }) => {
    allure.severity?.(severity);

    const nav = new NavigationBar(page);
    const transfer = new TransferFundsPage(page);

    await nav.go.transferFunds();
    await transfer.submitTransfer(amount, 0, 0);

    if (isValid) {
      await transfer.validateTransferSuccess();
    } else {
      await transfer.validateInvalidAmountError();
    }
  });
});
