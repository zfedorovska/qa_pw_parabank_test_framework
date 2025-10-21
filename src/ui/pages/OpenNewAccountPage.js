import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async openAccount(type = 'SAVINGS', fromIdx = 0) {
    await testStep(`Open new ${type} account`, async () => {
      const value = type === 'SAVINGS' ? '1' : '0'; // ParaBank: 0=CHECKING, 1=SAVINGS
      await this.page.selectOption('#type', value);
      await this.page.selectOption('#fromAccountId', { index: fromIdx });
      await this.page.click('input[value="Open New Account"]');
    }, this.userId);
  }

  async expectNewAccountId() {
    await testStep('Expect new account id visible', async () => {
      await expect(this.page.locator('#newAccountId')).toBeVisible();
    }, this.userId);
  }
}
