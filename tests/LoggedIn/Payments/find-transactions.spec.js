import { test } from '../../_fixtures/fixtures.js';
import * as allure from 'allure-js-commons';
import { NavigationBar } from '../../../src/ui/components/NavigationBar.js';
import { FindTransactionsPage } from '../../../src/ui/pages/FindTransactionsPage.js';

test('Find Transactions by amount', async ({ loggedInPage: page }) => {
  allure.severity('normal');

  const nav = new NavigationBar(page);
  const find = new FindTransactionsPage(page);

  await nav.go.findTransactions();
  await find.findByAmount('100', 0);
  await find.expectResultsPresent();
});

