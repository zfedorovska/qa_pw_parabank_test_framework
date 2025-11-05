import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class AccountDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.heading = this.page.getByRole('heading', { name: 'Account Details' });
    this.transactionRows = this.page.locator('#transactionTable tbody tr');
    this.monthSelector = this.page.locator('#month');
    this.transactionTypeSelector = this.page.locator('#transactionType');
    this.goButton = this.page.locator('input[value="Go"]');
  }

  async expectLoaded() {
    await testStep(
      'Account Details loaded',
      async () => {
        await expect(this.heading).toBeVisible();
        await expect(this.transactionRows.first()).toBeVisible();
      },
      this.userId
    );
  }

  async filterByMonth(month) {
    await this.monthSelector.selectOption(month);
  }

  async filterByTransactionType(type) {
    await this.transactionTypeSelector.selectOption(type);
  }

  async clickGoButton() {
    await this.goButton.click();
  }

  async filterAll() {
    await testStep(
      'Filter by All / All',
      async () => {
        await this.filterByMonth('All');
        await this.filterByTransactionType('All');
        await this.clickGoButton();
      },
      this.userId
    );
  }

  async expectTransactionsPresent() {
    await testStep(
      'Transactions present',
      async () => {
        await expect(this.transactionRows.first()).toBeVisible();
      },
      this.userId
    );
  }
}
