import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavigationBar } from '../../../src/ui/components/NavigationBar.js';
import { AccountsOverviewPage } from '../../../src/ui/pages/AccountsOverviewPage.js';
import { AccountDetailsPage } from '../../../src/ui/pages/AccountDetailsPage.js';

test('Account Details & Activity filtering works', async ({
  loggedInPage: page,
}) => {
  allure.severity?.('normal');

  const nav = new NavigationBar(page);
  const overview = new AccountsOverviewPage(page);
  const details = new AccountDetailsPage(page);

  await nav.go.accountsOverview();
  await overview.expectLoaded();
  await overview.openFirstAccount();

  await details.expectLoaded();
  await details.filterAll();
  await details.expectTransactionsPresent();
});
