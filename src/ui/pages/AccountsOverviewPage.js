import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async expectLoaded() {
    await testStep('Expect Accounts Overview loaded', async () => {
      await expect(this.page.getByRole('heading'
        , { name: 'Accounts Overview' })).toBeVisible();
    }, this.userId);
  }

  async openFirstAccount() {
    await testStep('Open first account from table', async () => {
      await this.page.locator('#accountTable tbody tr a').first().click();
    }, this.userId);
  }
}
