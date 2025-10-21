import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class AccountDetailsPage {
  constructor(page, userId = 0) { this.page = page; this.userId = userId; }

  async expectLoaded() {
    await testStep('Account Details loaded', async () => {
      await expect(this.page.getByRole('heading'
        , { name: 'Account Details' })).toBeVisible();
      await expect(this.page.locator('#transactionTable')).toBeVisible();
    }, this.userId);
  }

  async filterAll() {
    await testStep('Filter All', async () => {
      await this.page.selectOption('#month', 'All');
      await this.page.selectOption('#transactionType', 'All');
      await this.page.click('input[value="Go"]');
    }, this.userId);
  }

  async expectTransactionsPresent() {
    await testStep('Transactions present', async () => {
      await expect(this.page.locator('#transactionTable tbody tr')
      .first()).toBeVisible();
      }, this.userId);
  }
}
