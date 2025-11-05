import { testStep, expect } from "../../common/helpers/pwHelpers.js";

const PROFILE_UPDATED_TEXT = /Profile Updated/i;

export class ProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.street = page.locator('input[name="customer.address.street"]');
    this.updateBtn = page.getByRole("button", { name: "Update Profile" });
    this.rightPanel = page.locator("#rightPanel");
  }

  async waitForStreetInput() {
    await this.street.waitFor({ state: "visible" });
  }

  async updateStreet(value) {
    await testStep(`Update street to "${value}"`, async () => {
      await this.waitForStreetInput();
      await this.street.fill(value);
      await this.updateBtn.click();
    }, this.userId);
  }

  async expectUpdated() {
    await testStep("Expect profile updated", async () => {
      await expect(this.rightPanel).toContainText(PROFILE_UPDATED_TEXT);
    }, this.userId);
  }

  async expectStreetValue(value) {
    await testStep(`Expect street = "${value}"`, async () => {
      await expect(this.street).toHaveValue(value);
    }, this.userId);
  }
}
