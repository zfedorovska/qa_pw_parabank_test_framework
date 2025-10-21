import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async paySimple(acct = '123456', amount = '10.50', fromIdx = 0) {
    await testStep('Fill payee and submit payment', async () => {
      await this.page.fill('input[name="payee.name"]', 'ACME Inc');
      await this.page.fill('input[name="payee.address.street"]', '123 Main');
      await this.page.fill('input[name="payee.address.city"]', 'City');
      await this.page.fill('input[name="payee.address.state"]', 'CA');
      await this.page.fill('input[name="payee.address.zipCode"]', '90001');
      await this.page.fill('input[name="payee.phoneNumber"]', '5551112222');
      await this.page.fill('input[name="payee.accountNumber"]', acct);
      await this.page.fill('input[name="verifyAccount"]', acct);
      await this.page.fill('input[name="amount"]', amount);
      await this.page.selectOption('select[name="fromAccountId"]', { index: fromIdx });
      await this.page.click('input[value="Send Payment"]');
    }, this.userId);
  }

  async expectSuccess() {
    await testStep('Expect Bill Payment Complete', async () => {
      await expect(this.page.locator('#rightPanel')).toContainText(/Bill Payment Complete/i);
    }, this.userId);
  }
}
