import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as loginTest } from './login';

// merged test + expect for specs to import
export const test = mergeTests(genericTest, loginTest) as typeof genericTest;
export const expect = test.expect;
export default test;
