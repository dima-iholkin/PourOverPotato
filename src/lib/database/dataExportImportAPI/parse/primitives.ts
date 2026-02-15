import { parseDateFromInputString } from "$lib/_helpers/dateHelpers";
import { isNullOrUndefined } from "$lib/_helpers/undefinedHelpers";

export function checkIsValidEntityId(id: unknown | number): boolean {
  if (isNullOrUndefined(id) || Number.isInteger(id) === false || id as number < 0) {
    return false;
  }
  return true;
}

export function parseBooleanField(bool: unknown | boolean): boolean {
  if (isNullOrUndefined(bool) || typeof bool !== "boolean") {
    return false;
  }
  return bool;
}

export function parseDbVersion(importedDbVersion: unknown | number, txDbVersion: number): number | "ImportFailed" {
  // Guard clauses:
  if (isNullOrUndefined(importedDbVersion)) {
    alert("\"dbVersion\" property not found in the file. Import aborted.");
    return "ImportFailed";
  }
  if (Number.isInteger(importedDbVersion) === false) {
    alert("\"dbVersion\" property must be an integer. Import aborted.");
    return "ImportFailed";
  }
  // At this point we've proven the DbVersion is a number.
  const parsedDbVersion = importedDbVersion as number;
  // Guard clauses:
  if (parsedDbVersion <= 0) {
    alert("The file's \"dbVersion\" must be higher than 0. Import aborted.");
    return "ImportFailed";
  }
  if (parsedDbVersion > txDbVersion) {
    alert(
      `The file's "dbVersion" = ${importedDbVersion} is higher than the app's current "dbVersion" = ${txDbVersion}.
       Import aborted. Try refreshing the page and importing again. If the problem persists, please contact the
       developer.`
    );
    return "ImportFailed";
  }
  // Return the parsed DbVersion:
  return parsedDbVersion;
}

export function parseNumberField(num: unknown | number): number {
  if (isNullOrUndefined(num) || Number.isFinite(num) === false || num as number < 0) {
    return 0;
  }
  // At this point we've proven it's a positive number.
  return num as number;
}

export function parseTextField(str: unknown | string): string {
  if (isNullOrUndefined(str) || typeof str !== "string") {
    return "";
  }
  return str;
}

export function parseTimestampField(ts: unknown | string): Date | "ImportFailed" {
  // Guard clause:
  if (isNullOrUndefined(ts) || typeof ts !== "string") {
    return "ImportFailed";
  }
  // At this point we've proven Timestamp is a string.
  // Convert the string to Date:
  const date: Date = parseDateFromInputString(ts);
  // Guard clause:
  if (date.toString() === "Invalid Date") {
    return "ImportFailed";
  }
  // Return the parsed date:
  return date;
}

export function parseDateField(dateStr: unknown | string | undefined): Date | undefined | "ImportFailed" {
  // Guard clause:
  if (isNullOrUndefined(dateStr) || typeof dateStr !== "string") {
    return undefined;
  }
  // At this point we've proven this field is a string.
  // Convert the string to Date:
  const date: Date = parseDateFromInputString(dateStr);
  // Guard clause:
  if (date.toString() === "Invalid Date") {
    return "ImportFailed";
  }
  // Return the parsed date:
  return date;
}