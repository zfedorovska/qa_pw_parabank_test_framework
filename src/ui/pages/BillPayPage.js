import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.nameInput = this.page.locator('input[name="payee.name"]');
    this.streetInput = this.page.locator('input[name="payee.address.street"]');
    this.cityInput = this.page.locator('input[name="payee.address.city"]');
    this.stateInput = this.page.locator('input[name="payee.address.state"]');
    this.zipInput = this.page.locator('input[name="payee.address.zipCode"]');
    this.phoneInput = this.page.locator('input[name="payee.phoneNumber"]');
    this.accountInput = this.page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput = this.page.locator('input[name="verifyAccount"]');
    this.amountInput = this.page.locator('input[name="amount"]');
    this.fromAccountSelect = this.page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = this.page.locator('input[value="Send Payment"]');
    this.rightPanel = this.page.locator('#rightPanel');
  }

  async fillPayeeName(name) {
    await this.nameInput.fill(name);
  }

  async fillStreet(street) {
    await this.streetInput.fill(street);
  }

  async fillCity(city) {
    await this.cityInput.fill(city);
  }

  async fillState(state) {
    await this.stateInput.fill(state);
  }

  async fillZip(zip) {
    await this.zipInput.fill(zip);
  }

  async fillPhone(phone) {
    await this.phoneInput.fill(phone);
  }

  async fillAccountNumber(account) {
    await this.accountInput.fill(account);
  }

  async fillVerifyAccount(account) {
    await this.verifyAccountInput.fill(account);
  }

  async fillAmount(amount) {
    await this.amountInput.fill(amount);
  }

  async selectFromAccountByIndex(index) {
    await this.fromAccountSelect.selectOption({ index });
  }

  async clickSendPayment() {
    await this.sendPaymentButton.click();
  }

  async paySimple({
    name = 'ACME Inc',
    street = '123 Main',
    city = 'City',
    state = 'CA',
    zip = '90001',
    phone = '5551112222',
    account = '123456',
    amount = '10.50',
    fromIdx = 0,
  } = {}) {
    await testStep(
      'Fill payee and submit payment',
      async () => {
        await this.fillPayeeName(name);
        await this.fillStreet(street);
        await this.fillCity(city);
        await this.fillState(state);
        await this.fillZip(zip);
        await this.fillPhone(phone);
        await this.fillAccountNumber(account);
        await this.fillVerifyAccount(account);
        await this.fillAmount(amount);
        await this.selectFromAccountByIndex(fromIdx);
        await this.clickSendPayment();
      },
      this.userId
    );
  }

  async expectSuccess() {
    await testStep(
      'Expect Bill Payment Complete',
      async () => {
        await expect(this.rightPanel).toContainText(/Bill Payment Complete/i);
      },
      this.userId
    );
  }
}
