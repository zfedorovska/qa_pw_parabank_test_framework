import { test, expect } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavBar } from '../../../src/ui/components/NavBar.js';
import { AccountsOverviewPage } from '../../../src/ui/pages/AccountsOverviewPage.js';

test('Accounts Overview shows accounts table'
  , async ({ loggedInPage: page }) => {
  allure.severity?.('critical');

  const nav = new NavBar(page);
  const overview = new AccountsOverviewPage(page);

  await nav.go.accountsOverview();
  await overview.expectLoaded();

  await expect(page.locator('#accountTable')).toBeVisible();
  const rows = page.locator('#accountTable tbody tr');
  await expect(rows.first()).toBeVisible();
});
