import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { NavigationBar } from '../../../src/ui/components/NavigationBar.js';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage.js';

test('Update Contact Info persists', async ({ loggedInPage: page }) => {
  allure.severity?.('normal');

  const nav = new NavigationBar(page);
  const profile = new ProfilePage(page);

  await nav.go.updateContactInfo();
  await profile.updateStreet('221B Baker St');
  await profile.expectUpdated();
});
