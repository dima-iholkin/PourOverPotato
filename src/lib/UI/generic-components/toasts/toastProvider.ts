export function addToast(message: string) {
  const event = new CustomEvent<{
    message: string,
    timeout: number
  }>("addToast", { detail: { message, timeout: 5000 } });
  document.dispatchEvent(event);
}

export function addToastWithUndo(message: string, onClickUndo: () => void, onUndoIgnored: () => void) {
  const event = new CustomEvent<{
    message: string,
    timeout: number,
    onClickUndo: () => void,
    onUndoIgnored: () => void
  }>("addToast", { detail: { message, timeout: 15000, onClickUndo, onUndoIgnored } });
  document.dispatchEvent(event);
}