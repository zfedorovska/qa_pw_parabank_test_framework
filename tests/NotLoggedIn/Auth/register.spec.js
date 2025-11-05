import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { faker } from '@faker-js/faker';
import { AuthPage } from '../../../src/ui/pages/AuthPage.js';

test('User can register (positive)', async ({ page }) => {
  allure.severity?.('critical');

  const auth = new AuthPage(page);

  const username = `pb_${faker.string.alphanumeric(8)}`;
  const password = faker.internet.password({ length: 12, prefix: 'T1!' });

  const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: 'CA',
    zip: faker.location.zipCode('#####'),
    phone: faker.phone.number('555#######'),
    ssn: '123-45-6789',
    username,
    password,
    confirmPassword: password,
  };

  await auth.openHome();
  await auth.openRegisterForm();
  await auth.register(userData);
  await auth.expectRegisterSuccess();
});

test('Register negative (password mismatch)', async ({ page }) => {
  allure.severity?.('minor');

  const auth = new AuthPage(page);

  const username = `pb_${faker.string.alphanumeric(8)}`;
  const password = 'Test1234!';
  const otherPassword = 'Other123!';

  const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: 'CA',
    zip: faker.location.zipCode('#####'),
    phone: faker.phone.number('555#######'),
    ssn: '123-45-6789',
    username,
    password,
    confirmPassword: otherPassword,
  };

  await auth.openRegisterPageDirect();
  await auth.register(userData);
  await auth.expectPasswordMismatchError();
});
