import { testStep, expect } from "../../common/helpers/pwHelpers.js";

export class ProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.street = page.locator('input[name="customer.address.street"]');
    this.updateBtn = page.getByRole("button", { name: "Update Profile" });
    this.rightPanel = page.locator("#rightPanel");
  }

  async updateStreet(value) {
    await testStep(`Update street to "${value}"`, async () => {
      await this.street.waitFor({ state: "visible" });  // ✅ ensure page ready
      await this.street.fill(value);
      await this.updateBtn.click();
    }, this.userId);
  }

  async expectUpdated() {
    await testStep("Expect profile updated", async () => {
      // Parabank shows a confirmation heading
      await expect(this.rightPanel).toContainText(/Profile updated|Your updated address/i);
    }, this.userId);
  }
}
