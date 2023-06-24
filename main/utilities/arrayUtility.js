"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtility = void 0;
class ArrayUtility {
    constructor() { }
    static haveSameValues(arr1, arr2) {
        // Different lengths, can't have the same values
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every((value) => arr2.includes(value));
    }
}
exports.ArrayUtility = ArrayUtility;
//# sourceMappingURL=arrayUtility.js.map