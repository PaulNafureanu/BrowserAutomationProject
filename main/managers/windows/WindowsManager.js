"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowsManager = void 0;
const ManagerObject_1 = require("../abstractions/ManagerObject");
class WindowsManager extends ManagerObject_1.ManagerObject {
    constructor() {
        super();
    }
    static getInstance() {
        if (!WindowsManager.instance) {
            WindowsManager.instance = new WindowsManager();
        }
        return WindowsManager.instance;
    }
}
exports.WindowsManager = WindowsManager;
//# sourceMappingURL=WindowsManager.js.map