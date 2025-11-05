import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';

type TestFixtures = {
  infoTestLog: string;
  addAllureTestHierarchy: string;
};
type WorkerFixtures = {
  logger: Logger;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');
      await use(logger);
    },
    { scope: 'worker' },
  ],

  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file.replace(/\\+/g, '/');
      logger.info(`Test started: ${fileName}`);
      await use('infoTestLog');
      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],

  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file.replace(/\\+/g, '/');

      let parts: string[] = [];
      try {
        parts = parseTestTreeHierarchy(fileName) ?? [];
      } catch (e) {
        logger?.error?.(
          `parseTestTreeHierarchy failed for "${fileName}": ${String(e)}`
        );
        parts = [];
      }

      const [parentSuite, suite, subSuite] = [
        parts[0] ?? undefined,
        parts[1] ?? undefined,
        parts[2] ?? undefined,
      ];

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
