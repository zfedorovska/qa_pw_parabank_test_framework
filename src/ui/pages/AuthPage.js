import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class AuthPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.linkRegister = page.getByRole('link', { name: 'Register' });
    this.inputUsername = page.locator('input[name="username"]');
    this.inputPassword = page.locator('input[name="password"]');
    this.btnLogin = page.getByRole('button', { name: 'Log In' });
    this.loginError = page.locator('#rightPanel .error');

    this.registerHeading = page.getByRole('heading', { name: 'Signing up is easy!' });
    this.firstName = page.locator('#customer\\.firstName');
    this.lastName = page.locator('#customer\\.lastName');
    this.street = page.locator('#customer\\.address\\.street');
    this.city = page.locator('#customer\\.address\\.city');
    this.state = page.locator('#customer\\.address\\.state');
    this.zip = page.locator('#customer\\.address\\.zipCode');
    this.phone = page.locator('#customer\\.phoneNumber');
    this.ssn = page.locator('#customer\\.ssn');
    this.regUsername = page.locator('#customer\\.username');
    this.regPassword = page.locator('#customer\\.password');
    this.confirmPassword = page.locator('#repeatedPassword');
    this.registerButton = page.locator('input[value="Register"]');
    this.rightPanel = page.locator('#rightPanel');
    this.passwordMismatchError = page.locator('#repeatedPassword\\.errors');
  }

  async openHome() {
    await testStep(
      'Open home page',
      async () => {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm', {
          waitUntil: 'domcontentloaded',
        });
        await expect(this.btnLogin).toBeVisible();
      },
      this.userId
    );
  }

  async signIn(username, password) {
    await testStep(
      'Sign in',
      async () => {
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
        await this.btnLogin.click();
      },
      this.userId
    );
  }

  async expectLoginError() {
    await testStep(
      'Expect login error',
      async () => {
        await expect(this.loginError).toBeVisible();
      },
      this.userId
    );
  }

  async openRegister() {
    await testStep(
      'Open Register link',
      async () => {
        await this.linkRegister.click();
      },
      this.userId
    );
  }

  async openRegisterForm() {
    await testStep(
      'Open Register form',
      async () => {
        await this.openRegister();
        await expect(this.registerHeading).toBeVisible();
      },
      this.userId
    );
  }

  async openRegisterPageDirect() {
    await testStep(
      'Open Register page directly',
      async () => {
        await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
        await expect(this.registerHeading).toBeVisible();
      },
      this.userId
    );
  }

  async fillRegistrationForm(data) {
    const {
      firstName,
      lastName,
      street,
      city,
      state,
      zip,
      phone,
      ssn,
      username,
      password,
      confirmPassword,
    } = data;

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.street.fill(street);
    await this.city.fill(city);
    await this.state.fill(state);
    await this.zip.fill(zip);
    await this.phone.fill(phone);
    await this.ssn.fill(ssn);
    await this.regUsername.fill(username);
    await this.regPassword.fill(password);
    await this.confirmPassword.fill(confirmPassword);
  }

  async submitRegistration(data) {
    await testStep(
      'Fill and submit registration',
      async () => {
        await this.fillRegistrationForm(data);
        await this.registerButton.click();
      },
      this.userId
    );
  }

  async register(data) {
    await this.submitRegistration(data);
  }

  async expectRegisterSuccess() {
    await testStep(
      'Expect success banner',
      async () => {
        await expect(this.rightPanel).toContainText(
          'Your account was created successfully'
        );
      },
      this.userId
    );
  }

  async expectPasswordMismatchError() {
    await testStep(
      'Expect password mismatch error',
      async () => {
        await expect(this.passwordMismatchError).toHaveText('Passwords did not match.');
      },
      this.userId
    );
  }
}
