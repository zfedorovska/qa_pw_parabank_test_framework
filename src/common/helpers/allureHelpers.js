import { camelCaseToPhrase, capitalize } from "./stringHelpers";

const TEST_FILE_REGEX = /\.(spec|test)\.(t|j)sx?$/i;

export function parseTestTreeHierarchy(file) {
  const parts = (file || "")
    .replace(/\\+/g, "/")
    .replace(/^.*?(?:^|\/)(?:tests|__tests__)(?:\/|$)/i, "")
    .split("/")
    .filter(Boolean);

  const lastPart = parts.at(-1) || "";

  if (TEST_FILE_REGEX.test(lastPart)) {
    parts.pop();
  }

  return parts.map(s =>
    capitalize(
      camelCaseToPhrase(s.replace(/[_-]+/g, " ")).trim()
    )
  );
}
