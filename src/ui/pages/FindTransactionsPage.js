import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class FindTransactionsPage {
  constructor(page, userId = 0) { this.page = page; this.userId = userId; }

  async expectLoaded() {
    await testStep('Find Transactions page loaded', async () => {
      await expect(this.page.getByRole('heading'
        , { name: /Find Transactions/i })).toBeVisible();
      await expect(this.page.locator('#accountId')).toBeVisible();
      await this.page.waitForURL(/findtrans\.htm/i);
    }, this.userId);
  }

  async byAmount(amount, accountIdx = 0) {
    await testStep(`Find by amount = ${amount}`, async () => {
      await this.expectLoaded();

      // Select account (top dropdown)
      await this.page.selectOption('#accountId', { index: accountIdx });

      const amountInput = this.page.locator('#amount');
      await amountInput.waitFor({ state: 'visible' });
      await amountInput.fill(String(amount));
      await this.page.locator('#findByAmount').click();
    }, this.userId);
  }

  async expectResultsOrEmpty() {
    await testStep('Expect results or empty state', async () => {
      await expect(this.page.locator('#rightPanel'))
        .toContainText(/Results|Transaction Results|No transactions found/i);
    }, this.userId);
  }
}
