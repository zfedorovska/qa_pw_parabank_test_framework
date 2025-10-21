export const capitalize = (s = "") =>
  s ? s[0].toUpperCase() + s.slice(1) : "";

export const camelCaseToPhrase = (s = "") =>
  String(s).replace(/([a-z])([a-z0-9]*)([A-Z])/g, "$1$2 $3");
