import { testStep } from "../../common/helpers/pwHelpers.js";

export class NavBar {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  step(title, fn) {
    return testStep(title, fn, this.userId);
  }

  nav(name, urlPattern, title = `Open ${name} page`, readySelector) {
    return this.step(title, async () => {
      await this.page.getByRole("link", { name }).click();
      if (urlPattern) await this.page.waitForURL(urlPattern, { waitUntil: "domcontentloaded" });
      if (readySelector) await this.page.locator(readySelector).waitFor({ state: "visible" });
    });
  }

  go = {
    openNewAccount:   () => this.nav("Open New Account", "**/openaccount.htm", "Open New Account page", "#type"),
    transferFunds:    () => this.nav("Transfer Funds", "**/transfer.htm", "Open Transfer Funds page", "#fromAccountId"),
    billPay:          () => this.nav("Bill Pay", "**/billpay.htm", "Open Bill Pay page", 'input[name="payee.name"]'),
    findTransactions: () => this.nav("Find Transactions", "**/findtrans.htm", "Open Find Transactions page", "#accountId"),
    updateContactInfo:() => this.nav("Update Contact Info", "**/updateprofile.htm", "Open Update Contact Info page", 'input[name="customer.address.street"]'),
    requestLoan:      () => this.nav("Request Loan", "**/requestloan.htm", "Open Request Loan page", "#amount"),
    accountsOverview: () => this.nav("Accounts Overview", "**/overview.htm", "Open Accounts Overview", 'h1:has-text("Accounts Overview")'),

    logout:           () => this.step("Log out", async () => {
      await this.page.getByRole("link", { name: "Log Out" }).click();

      await Promise.race([
        this.page.waitForURL(/\/(index|login)\.htm/i, { waitUntil: "domcontentloaded", timeout: 10000 }),
        this.page.getByRole("button", { name: "Log In" }).waitFor({ state: "visible", timeout: 10000 }),
      ]);
    }),
  };
}
