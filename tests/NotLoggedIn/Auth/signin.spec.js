import { test, expect } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { AuthPage } from '../../../src/ui/pages/AuthPage.js';

test('Sign in with valid credentials', async ({ page }) => {
  allure.severity?.('blocker');

  const auth = new AuthPage(page);
  await auth.openHome();
  await auth.signIn(process.env.PB_USER || 'john'
    , process.env.PB_PASS || 'demo');

  await expect(page.getByRole('heading', { name: 'Accounts Overview' }))
  .toBeVisible();
});

test('Sign in with invalid password shows error', async ({ page }) => {
  allure.severity?.('normal');

  const auth = new AuthPage(page);
  await auth.openHome();
  await auth.signIn('invalidUser', 'invalidPass');

  await auth.expectLoginError();
});
