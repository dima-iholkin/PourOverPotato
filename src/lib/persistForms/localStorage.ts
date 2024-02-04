import { browser } from '$app/environment';

const FORM_PREFIX = "form_";

export function persistFormField(formName: string, inputName: string, value: string | number) {
  if (browser === false) {
    return;
  }

  const key: string = generateKey(formName, inputName);
  localStorage.setItem(key, value as string);
}

export function loadFormField(formName: string, inputName: string, type: "string" | "number"): string | number | null {
  if (browser === false) {
    return null;
  }

  const key: string = generateKey(formName, inputName);
  const valueStr: string | null = localStorage.getItem(key);

  if (valueStr === null) {
    return null;
  }

  if (type === "number") {
    const value: number = Number.parseFloat(valueStr);

    if (Number.isNaN(value)) {
      return null;
    }

    return value;
  }

  // Else the value is string and should be returned as such.
  return valueStr;
}

export function clearFormField(formName: string, inputName: string) {
  if (browser === false) {
    return;
  }

  const key: string = generateKey(formName, inputName);
  localStorage.removeItem(key);
}

// Helper functions:

function generateKey(formName: string, inputName: string) {
  return `form_${formName}_${inputName}`;
}