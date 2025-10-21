import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class TransferFundsPage {
  constructor(page, userId = 0) { this.page = page; this.userId = userId; }

  async transfer(amount, fromIdx = 0, toIdx = 0) {
    await testStep(`Transfer amount=${amount}`, async () => {
      await this.page.fill('#amount', String(amount));
      await this.page.selectOption('#fromAccountId', { index: fromIdx });
      await this.page.selectOption('#toAccountId', { index: toIdx });
      await this.page.click('input[value="Transfer"]');
    }, this.userId);
  }

async expectResult(amount) {
    await testStep('Validate transfer result', async () => {
      const n = Number(amount);
      const ok = Number.isFinite(n) && n > 0;

      if (ok) {
        await expect(this.page.getByRole('heading'
          , { name: 'Transfer Complete!' })).toBeVisible();
      } else {
        await expect(this.page.locator('#rightPanel'))
          .toContainText(/Please enter a valid amount\.|The amount cannot be empty\./);
      }
    }, this.userId);
  }
}
