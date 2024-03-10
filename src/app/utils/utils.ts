export function assertElementIsNull<T>(item?: T): asserts item {
  if (item === null) {
    throw new Error('element is equal null');
  }
}

export function isDescendant(child: HTMLElement, parent: HTMLElement): boolean {
  let node = child.parentNode;

  while (node !== null) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}
