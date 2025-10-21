import { testStep } from "../../common/helpers/pwHelpers.js";

export class NavBar {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  step(title, fn) {
    return testStep(title, fn, this.userId);
  }

  nav(name, urlPattern, title = `Open ${name} page`) {
    return this.step(title, async () => {
      await this.page.getByRole("link", { name }).click();
    });
  }

  go = {
    openNewAccount: () => this.nav("Open New Account", "**/openaccount.htm"),
    transferFunds:  () => this.nav("Transfer Funds", "**/transfer.htm"),
    billPay:        () => this.nav("Bill Pay", "**/billpay.htm"),
    findTransactions: () => this.nav("Find Transactions", "**/findtrans.htm"),
    updateContactInfo: () => this.nav("Update Contact Info", "**/updateprofile.htm"),
    requestLoan:    () => this.nav("Request Loan", "**/requestloan.htm"),
    accountsOverview: () => this.nav("Accounts Overview", "**/overview.htm", "Open Accounts Overview"),
    logout:         () => this.nav("Log Out", "**/index.htm", "Log out"),
  };
}
