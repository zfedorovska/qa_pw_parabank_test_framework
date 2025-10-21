import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';

// ---- Fixture types
type TestFixtures = {
  infoTestLog: string;
  addAllureTestHierarchy: string;
};
type WorkerFixtures = {
  logger: Logger;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  // Worker fixture
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');
      await use(logger);
    },
    { scope: 'worker' },
  ],

  // Auto test-level logging
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file.replace(/\\+/g, '/'); // normalize
      logger.info(`Test started: ${fileName}`);
      await use('infoTestLog');
      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],

  // Auto Allure suite hierarchy from file path
  addAllureTestHierarchy: [
    async ({}, use, testInfo) => {
      const fileName = testInfo.file;
      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(fileName);

      if (parentSuite) await allure.parentSuite(parentSuite);
      if (suite)       await allure.suite(suite);
      if (subSuite)    await allure.subSuite(subSuite);

      await use('addAllureTestHierarchy');
    },
    { scope: 'test', auto: true },
  ],
});

export const expect = test.expect;
export default test;
