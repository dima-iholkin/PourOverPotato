export function isNullOrUndefined(obj: unknown): boolean {
  return obj === undefined || obj === null;
}

export function isPresent(obj: unknown): boolean {
  return obj !== undefined && obj !== null;
}