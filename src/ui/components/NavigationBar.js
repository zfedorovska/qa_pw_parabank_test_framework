import { testStep } from "../../common/helpers/pwHelpers.js";

export class NavigationBar {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  step(title, fn) {
    return testStep(title, fn, this.userId);
  }

  async clickNavLink(name) {
    await this.page.getByRole("link", { name }).click();
  }

  async waitForPageUrl(urlPattern) {
    await this.page.waitForURL(urlPattern, {
      waitUntil: "domcontentloaded",
    });
  }

  async waitForVisible(selector) {
    await this.page.locator(selector).waitFor({ state: "visible" });
  }

  async waitForLoggedOut() {
    await this.page.waitForURL(/\/(index|login)\.htm/i, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    await this.page
      .getByRole("button", { name: "Log In" })
      .waitFor({ state: "visible", timeout: 5000 });
  }

  go = {
    accountsOverview: () =>
      this.step("Open Accounts Overview page", async () => {
        await this.clickNavLink("Accounts Overview");
        await this.waitForPageUrl("**/overview.htm");
        await this.waitForVisible('h1:has-text("Accounts Overview")');
      }),

    openNewAccount: () =>
      this.step("Open New Account page", async () => {
        await this.clickNavLink("Open New Account");
        await this.waitForPageUrl("**/openaccount.htm");
        await this.waitForVisible("#type");
      }),

    transferFunds: () =>
      this.step("Open Transfer Funds page", async () => {
        await this.clickNavLink("Transfer Funds");
        await this.waitForPageUrl("**/transfer.htm");
        await this.waitForVisible("#fromAccountId");
      }),

    billPay: () =>
      this.step("Open Bill Pay page", async () => {
        await this.clickNavLink("Bill Pay");
        await this.waitForPageUrl("**/billpay.htm");
        await this.waitForVisible('input[name="payee.name"]');
      }),

    findTransactions: () =>
      this.step("Open Find Transactions page", async () => {
        await this.clickNavLink("Find Transactions");
        await this.waitForPageUrl("**/findtrans.htm");
        await this.waitForVisible("#accountId");
      }),

    updateContactInfo: () =>
      this.step("Open Update Contact Info page", async () => {
        await this.clickNavLink("Update Contact Info");
        await this.waitForPageUrl("**/updateprofile.htm");
        await this.waitForVisible('input[name="customer.address.street"]');
      }),

    requestLoan: () =>
      this.step("Open Request Loan page", async () => {
        await this.clickNavLink("Request Loan");
        await this.waitForPageUrl("**/requestloan.htm");
        await this.waitForVisible("#amount");
      }),

    logout: () =>
      this.step("Log out", async () => {
        await this.clickNavLink("Log Out");
        await this.waitForLoggedOut();
      }),
  };
}
