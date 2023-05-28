"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserManager = void 0;
const ManagerObject_1 = require("../abstractions/ManagerObject");
class BrowserManager extends ManagerObject_1.ManagerObject {
    static instance;
    constructor() {
        super();
    }
    static getInstance() {
        if (!BrowserManager.instance) {
            BrowserManager.instance = new BrowserManager();
        }
        return BrowserManager.instance;
    }
}
exports.BrowserManager = BrowserManager;
//# sourceMappingURL=BrowserManager.js.map