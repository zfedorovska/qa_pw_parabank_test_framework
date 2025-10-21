import { test, expect } from "@playwright/test";

export const testStep = async (title, fn, userId = 0) => {
  const stepTitle = userId > 0 ? `User${userId}: ${title}` : title;
  return test.step(stepTitle, fn);
};

export { expect };
