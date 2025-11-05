import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavigationBar } from '../../../src/ui/components/NavigationBar.js';

test('User can Log out', async ({ loggedInPage: page }) => {
  allure.severity?.('normal');

  const nav = new NavigationBar(page);

  await nav.go.logout();
});
