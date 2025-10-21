import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async apply(amount, downPayment, fromIdx = 0) {
    await testStep(`Apply for loan amount=${amount}`, async () => {
      await this.page.fill('#amount', String(amount));
      await this.page.fill('#downPayment', String(downPayment));
      await this.page.selectOption('#fromAccountId', { index: fromIdx });
      await this.page.click('input[value="Apply Now"]');
    }, this.userId);
  }

  async expectDecision() {
    await testStep('Expect Approved/Denied or validation', async () => {
      await expect(this.page.locator('#rightPanel')).toContainText(/Approved|Denied|down payment/i);
    }, this.userId);
  }
}
