import { test, expect } from "@playwright/test";

/** Wrap a function in a Playwright step with optional user tag. */
export const testStep = (title, fn, userId = 0) => {
  const stepTitle = userId > 0 ? `User${userId}: ${title}` : title;
  return test.step(stepTitle, fn);
};

export { expect };
