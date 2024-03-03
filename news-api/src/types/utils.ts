// Assertion Function

export function assertElementIsNull<T>(item?: T): asserts item {
  if (item === null) {
    throw new Error('element is equal null');
  }
}
