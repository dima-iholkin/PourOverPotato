export function isNullOrUndefined(obj: unknown) {
  return obj === undefined || obj === null;
}

export function isPresent(obj: unknown) {
  return obj !== undefined && obj !== null;
}