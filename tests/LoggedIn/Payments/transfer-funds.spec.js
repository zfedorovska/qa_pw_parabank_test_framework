import { test } from '../../_fixtures/fixtures.js';
import * as allure from 'allure-js-commons';
import { NavBar } from '../../../src/ui/components/NavBar.js';
import { TransferFundsPage } from '../../../src/ui/pages/TransferFundsPage.js';

const amounts = ['1', '25.50', '0', '-5', 'abc'];

for (const amount of amounts) {
  test(`Transfer Funds amount="${amount}"`, async ({ loggedInPage: page }) => {
    // eslint-disable-next-line max-len
    allure.severity?.(['0', '-5', 'abc'].includes(amount) ? 'minor' : 'critical');

    const nav = new NavBar(page);
    const transfer = new TransferFundsPage(page);

    await nav.go.transferFunds();
    await transfer.transfer(amount, 0, 0);
    await transfer.expectResult(amount);
  });
}
