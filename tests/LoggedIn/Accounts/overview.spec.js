import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavigationBar } from '../../../src/ui/components/NavigationBar.js';
import { AccountsOverviewPage } from '../../../src/ui/pages/AccountsOverviewPage.js';

test('Accounts Overview shows accounts table', async ({ loggedInPage: page }) => {
  allure.severity?.('critical');

  const nav = new NavigationBar(page);
  const overview = new AccountsOverviewPage(page);

  await nav.go.accountsOverview();
  await overview.expectLoaded();
  await overview.expectAccountsTableVisible();
});
