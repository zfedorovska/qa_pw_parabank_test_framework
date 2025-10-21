import { testStep } from '../../common/helpers/pwHelpers.js';

export class NavBar {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title, fn) {
    return testStep(title, fn, this.userId);
  }

  go = {
    openNewAccount: async () =>
      this.step('Open New Account page', async () =>
        this.page.getByRole('link', { name: 'Open New Account' }).click()
      ),

    transferFunds: async () =>
      this.step('Open Transfer Funds page', async () =>
        this.page.getByRole('link', { name: 'Transfer Funds' }).click()
      ),

    billPay: async () =>
      this.step('Open Bill Pay page', async () =>
        this.page.getByRole('link', { name: 'Bill Pay' }).click()
      ),

    findTransactions: async () =>
      this.step('Open Find Transactions page', async () =>
        this.page.getByRole('link', { name: 'Find Transactions' }).click()
      ),

    updateContactInfo: async () =>
      this.step('Open Update Contact Info page', async () =>
        this.page.getByRole('link', { name: 'Update Contact Info' }).click()
      ),

    requestLoan: async () =>
      this.step('Open Request Loan page', async () =>
        this.page.getByRole('link', { name: 'Request Loan' }).click()
      ),

    accountsOverview: async () =>
      this.step('Open Accounts Overview', async () =>
        this.page.getByRole('link', { name: 'Accounts Overview' }).click()
      ),

    logout: async () =>
      this.step('Log out', async () =>
        this.page.getByRole('link', { name: 'Log Out' }).click()
      ),
  };
}
