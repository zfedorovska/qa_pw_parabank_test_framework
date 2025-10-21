import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavBar } from '../../../src/ui/components/NavBar.js';
import { FindTransactionsPage } from '../../../src/ui/pages/FindTransactionsPage.js';

test('Find Transactions by amount', async ({ loggedInPage: page }) => {
  allure.severity?.('normal');

  const nav = new NavBar(page);
  const find = new FindTransactionsPage(page);

  await nav.go.findTransactions();
  await find.byAmount('10.50', 0);
  await find.expectResultsOrEmpty();
});
