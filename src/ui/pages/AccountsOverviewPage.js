import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.heading = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountTable = page.locator('#accountTable');
    this.accountRows = this.accountTable.locator('tbody tr');
    this.accountLinks = this.accountTable.locator('tbody tr td a');
  }

  async expectLoaded() {
    await testStep(
      'Accounts Overview loaded',
      async () => {
        await this.page.waitForURL(/overview\.htm/i);
        await expect(this.heading).toBeVisible();
      },
      this.userId
    );
  }

  async expectAccountsTableVisible() {
    await testStep(
      'Accounts table visible',
      async () => {
        await expect(this.accountTable).toBeVisible();
        await expect(this.accountRows.first()).toBeVisible();
      },
      this.userId
    );
  }

  async openFirstAccount() {
    await testStep(
      'Open first account from table',
      async () => {
        await expect(this.accountLinks.first()).toBeVisible();
        await this.accountLinks.first().click();

        await expect(
          this.page.getByRole('heading', { name: 'Account Details' })
        ).toBeVisible();
      },
      this.userId
    );
  }
}
