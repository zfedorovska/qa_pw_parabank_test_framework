import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class ProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async updateStreet(newStreet) {
    await testStep('Update street and submit', async () => {
      await this.page.fill('#customer\\.address\\.street', newStreet);
      await this.page.click('input[value="Update Profile"]');
    }, this.userId);
  }

  async expectUpdated() {
    await testStep('Expect Profile Updated banner', async () => {
      await expect(this.page.locator('#rightPanel')).toContainText(/Profile Updated/i);
    }, this.userId);
  }
}
