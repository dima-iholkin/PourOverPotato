import { browser } from "$app/environment";

export function clearFormField(formName: string, inputName: string): void {
  if (browser === false) {
    return;
  }
  const key: string = generateKey(formName, inputName);
  localStorage.removeItem(key);
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

export function persistFormField(formName: string, inputName: string, value: string | number): void {
  if (browser === false) {
    return;
  }
  const key: string = generateKey(formName, inputName);
  localStorage.setItem(key, value as string);
}

// Helper functions:

function generateKey(formName: string, inputName: string): string {
  return `form_${formName}_${inputName}`;
}