export function addToast(message: string) {
  const event = new CustomEvent<string>("addToast", { detail: message });
  document.dispatchEvent(event);
}