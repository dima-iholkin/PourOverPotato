export function clickOutsideTheBox(element: Element, click: MouseEvent) {
  const box: DOMRect = element.getBoundingClientRect();
  const x: number = click.clientX;
  const y: number = click.clientY;

  if (x < box.left || x > box.right || y < box.top || y > box.bottom) {
    return true;
  }

  return false;
}