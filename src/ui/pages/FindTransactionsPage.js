import { expect, testStep } from '../../common/helpers/pwHelpers.js';

const TRANSACTION_RESULTS_TEXT = /Transaction Results|Results/i;
const NO_TRANSACTIONS_TEXT = /No transactions found/i;

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.heading = this.page.getByRole('heading', { name: /Find Transactions/i });
    this.accountSelect = this.page.locator('#accountId');
    this.amountInput = this.page.locator('#amount');
    this.findByAmountButton = this.page.locator('#findByAmount');
    this.rightPanel = this.page.locator('#rightPanel');
    this.resultRows = this.page.locator('#transactionTable tbody tr');
  }

  async expectLoaded() {
    await testStep(
      'Find Transactions page loaded',
      async () => {
        await this.page.waitForURL(/findtrans\.htm/i);
        await expect(this.heading).toBeVisible();
        await expect(this.accountSelect).toBeVisible();
      },
      this.userId
    );
  }

  async selectAccountByIndex(accountIdx = 0) {
    await this.accountSelect.waitFor({ state: 'visible' });
    await this.accountSelect.selectOption({ index: accountIdx });
  }

  async fillAmount(amount) {
    await this.amountInput.waitFor({ state: 'visible' });
    await this.amountInput.fill(String(amount));
  }

  async clickFindByAmount() {
    await this.findByAmountButton.click();
  }

  async findByAmount(amount, accountIdx = 0) {
    await testStep(
      `Find by amount = ${amount}`,
      async () => {
        await this.expectLoaded();
        await this.selectAccountByIndex(accountIdx);
        await this.fillAmount(amount);
        await this.clickFindByAmount();
      },
      this.userId
    );
  }

  async expectResultsPresent() {
    await testStep(
      'Expect transactions found',
      async () => {
        await expect(this.rightPanel).toContainText(TRANSACTION_RESULTS_TEXT);
        await expect(this.resultRows.first()).toBeVisible();
      },
      this.userId
    );
  }

  async expectNoResults() {
    await testStep(
      'Expect no transactions',
      async () => {
        await expect(this.rightPanel).toContainText(NO_TRANSACTIONS_TEXT);
        await expect(this.resultRows).toHaveCount(0);
      },
      this.userId
    );
  }
}
