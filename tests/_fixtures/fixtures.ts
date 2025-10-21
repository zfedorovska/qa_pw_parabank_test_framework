import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as loginTest } from './login';

export const test = mergeTests(genericTest, loginTest) as typeof genericTest;
export const expect = test.expect;
