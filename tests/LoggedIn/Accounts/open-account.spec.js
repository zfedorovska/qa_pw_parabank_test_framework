import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavigationBar } from '../../../src/ui/components/NavigationBar.js';
import { AccountPage } from '../../../src/ui/pages/AccountPage.js';

test('Open New Account (Savings) succeeds', async ({ loggedInPage: page }) => {
  allure.severity?.('critical');

  const nav = new NavigationBar(page);
  const openAcc = new AccountPage(page);

  await nav.go.openNewAccount();
  await openAcc.openAccount('SAVINGS', 0);
  await openAcc.expectNewAccountId();
});
