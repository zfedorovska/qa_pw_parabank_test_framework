import { test, expect } from '../../_fixtures/fixtures.js';
import * as allure from 'allure-js-commons';
import { NavBar } from '../../../src/ui/components/NavBar.js';

test('User can Log out', async ({ loggedInPage: page }) => {
  allure.severity?.('normal');

  const nav = new NavBar(page);

  await nav.go.logout();
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
});
