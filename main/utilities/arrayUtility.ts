export class ArrayUtility {
  private constructor() {}
  static haveSameValues(arr1: readonly any[], arr2: readonly any[]): boolean {
    // Different lengths, can't have the same values
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((value) => arr2.includes(value));
  }
}
