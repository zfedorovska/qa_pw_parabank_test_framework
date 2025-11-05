import { expect, testStep } from '../../common/helpers/pwHelpers.js';

const ACCOUNT_TYPES = {
  CHECKING: '0',
  SAVINGS: '1',
};

export class AccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.typeSelect = this.page.locator('#type');
    this.fromAccountSelect = this.page.locator('#fromAccountId');
    this.openButton = this.page.locator('input[value="Open New Account"]');
    this.newAccountId = this.page.locator('#newAccountId');
  }

  async selectAccountType(type = 'SAVINGS') {
    const value = ACCOUNT_TYPES[type];
    await this.typeSelect.selectOption(value);
  }

  async selectFromAccountByIndex(index = 0) {
    await this.fromAccountSelect.selectOption({ index });
  }

  async clickOpenNewAccount() {
    await this.openButton.click();
  }

  async openAccount(type = 'SAVINGS', fromIdx = 0) {
    await testStep(
      `Open new ${type} account`,
      async () => {
        await this.selectAccountType(type);
        await this.selectFromAccountByIndex(fromIdx);
        await this.clickOpenNewAccount();
      },
      this.userId
    );
  }

  async expectNewAccountId() {
    await testStep(
      'Expect new account id visible',
      async () => {
        await expect(this.newAccountId).toBeVisible();
      },
      this.userId
    );
  }
}
