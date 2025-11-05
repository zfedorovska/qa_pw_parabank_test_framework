import { expect, testStep } from '../../common/helpers/pwHelpers.js';

const LOOKUP_RESULT_TEXT =
  /(Customer Lookup|The customer information provided could not be found\.)/i;

export class CustomerLookupPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.heading = page.getByRole('heading', { name: /Customer Lookup/i });
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.street = page.locator('#address\\.street');
    this.city = page.locator('#address\\.city');
    this.state = page.locator('#address\\.state');
    this.zip = page.locator('#address\\.zipCode');
    this.ssn = page.locator('#ssn');
    this.submitBtn = page.locator('input[value="Find My Login Info"]');
    this.rightPanel = page.locator('#rightPanel');
  }

  async open() {
    await testStep(
      'Open "Forgot login info?" page',
      async () => {
        await this.page.goto('https://parabank.parasoft.com/parabank/lookup.htm');
        await expect(this.heading).toBeVisible();
      },
      this.userId
    );
  }

  async fillForm({
    firstName,
    lastName,
    street,
    city,
    state,
    zip,
    ssn,
  }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.street.fill(street);
    await this.city.fill(city);
    await this.state.fill(state);
    await this.zip.fill(zip);
    await this.ssn.fill(ssn);
  }

  async submitLookup(data) {
    await testStep(
      'Submit lookup form',
      async () => {
        await this.fillForm(data);
        await this.submitBtn.click();
      },
      this.userId
    );
  }

  async expectResultArea() {
    await testStep(
      'Expect result area',
      async () => {
        await expect(this.rightPanel).toContainText(LOOKUP_RESULT_TEXT);
      },
      this.userId
    );
  }
}
