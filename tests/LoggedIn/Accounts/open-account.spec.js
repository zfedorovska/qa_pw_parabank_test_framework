import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavBar } from '../../../src/ui/components/NavBar.js';
import { OpenNewAccountPage } from '../../../src/ui/pages/OpenNewAccountPage.js';

test('Open New Account (Savings) succeeds', async ({ loggedInPage: page }) => {
  allure.severity?.('critical');

  const nav = new NavBar(page);
  const openAcc = new OpenNewAccountPage(page);

  await nav.go.openNewAccount();
  await openAcc.openAccount('SAVINGS', 0);
  await openAcc.expectNewAccountId();
});
