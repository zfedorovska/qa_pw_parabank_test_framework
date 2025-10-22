import { camelCaseToPhrase, capitalize } from "./stringHelpers";

export function parseTestTreeHierarchy(file) {
  const parts = (file || "")
    .replace(/\\+/g, "/")
    .replace(/^.*?(?:^|\/)(?:tests|__tests__)(?:\/|$)/i, "")
    .split("/")
    .filter(Boolean);

  // drop the filename if it's a test file
  if (/\.(spec|test)\.(t|j)sx?$/i.test(parts.at(-1) || "")) parts.pop();

  // prettify each segment: handles camelCase and also underscores/dashes
  return parts.map(s =>
    capitalize(
      camelCaseToPhrase(s.replace(/[_-]+/g, " ")).trim()
    )
  );
}
