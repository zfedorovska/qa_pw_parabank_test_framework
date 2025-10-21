import { expect, testStep } from '../../common/helpers/pwHelpers.js';

export class AuthPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.linkRegister = page.getByRole('link', { name: 'Register' });
    this.inputUsername = page.locator('input[name="username"]');
    this.inputPassword = page.locator('input[name="password"]');
    this.btnLogin = page.getByRole('button', { name: 'Log In' });
  }

  async openHome() {
    await testStep('Go to home', async () =>
      this.page.goto('https://parabank.parasoft.com/parabank/index.htm')
    );
  }

  async openRegister() {
    await testStep('Open Register form', async () => this.linkRegister.click(), this.userId);
  }

  async signIn(username, password) {
    await testStep('Sign in', async () => {
      await this.inputUsername.fill(username);
      await this.inputPassword.fill(password);
      await this.btnLogin.click();
    }, this.userId);
  }

  async expectLoginError() {
    await testStep('Expect login error', async () => {
      await expect(this.page.locator('#rightPanel .error')).toBeVisible();
    }, this.userId);
  }
}
