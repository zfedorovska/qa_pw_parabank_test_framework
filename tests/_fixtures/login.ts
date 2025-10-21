/// <reference types="node" />

import type { Page } from '@playwright/test';
import genericBase from './fixturesGeneric';
import { AuthPage } from '../../src/ui/pages/AuthPage.js';

type Fixtures = {
  loggedInPage: Page;
  loginAs: (u?: string, p?: string) => Promise<void>;
};

const U = process.env.PB_USER ?? 'john';
const P = process.env.PB_PASS ?? 'demo';

export const test = genericBase.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    const auth = new AuthPage(page);
    await auth.openHome();
    await auth.signIn(U, P);
    await genericBase.expect(
      page.getByRole('heading', { name: 'Accounts Overview' })
    ).toBeVisible();
    await use(page);
  },

  loginAs: async ({ page }, use) => {
    await use(async (u = U, p = P) => {
      const auth = new AuthPage(page);
      await auth.openHome();
      await auth.signIn(u, p);
      await genericBase.expect(
        page.getByRole('heading', { name: 'Accounts Overview' })
      ).toBeVisible();
    });
  },
});

export const expect = test.expect;
export default test;
