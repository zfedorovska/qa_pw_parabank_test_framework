import { expect, testStep } from '../../common/helpers/pwHelpers.js';

const TRANSFER_SUCCESS_HEADING = 'Transfer Complete!';
const INVALID_AMOUNT_ERROR_TEXT = 'Please enter a valid amount.';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.amountInput = this.page.locator('#amount');
    this.fromAccountSelect = this.page.locator('#fromAccountId');
    this.toAccountSelect = this.page.locator('#toAccountId');
    this.transferButton = this.page.locator('input[value="Transfer"]');
    this.rightPanel = this.page.locator('#rightPanel');
    this.successHeading = this.page.getByRole('heading', {
      name: TRANSFER_SUCCESS_HEADING,
    });
  }

  async fillAmount(amount) {
    await this.amountInput.fill(String(amount));
  }

  async selectFromAccountByIndex(index = 0) {
    await this.fromAccountSelect.waitFor({ state: 'visible' });
    await this.fromAccountSelect.selectOption({ index });
  }

  async selectToAccountByIndex(index = 0) {
    await this.toAccountSelect.waitFor({ state: 'visible' });
    await this.toAccountSelect.selectOption({ index });
  }

  async clickTransfer() {
    await this.transferButton.click();
  }

  async submitTransfer(amount, fromIdx = 0, toIdx = 0) {
    await testStep(
      `Submit transfer amount=${amount}`,
      async () => {
        await this.fillAmount(amount);
        await this.selectFromAccountByIndex(fromIdx);
        await this.selectToAccountByIndex(toIdx);
        await this.clickTransfer();
      },
      this.userId
    );
  }

  async validateTransferSuccess() {
    await testStep(
      'Validate transfer success',
      async () => {
        await expect(this.successHeading).toBeVisible();
      },
      this.userId
    );
  }

  async validateInvalidAmountError() {
    await testStep(
      'Validate invalid amount error',
      async () => {
        await expect(this.rightPanel).toContainText(INVALID_AMOUNT_ERROR_TEXT);
      },
      this.userId
    );
  }
}
