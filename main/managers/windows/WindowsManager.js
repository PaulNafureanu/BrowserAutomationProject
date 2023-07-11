"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowsManager = void 0;
class WindowsManager {
    constructor() { }
    static getInstance() {
        if (!WindowsManager.instance) {
            WindowsManager.instance = new WindowsManager();
        }
        return WindowsManager.instance;
    }
}
exports.WindowsManager = WindowsManager;
//# sourceMappingURL=WindowsManager.js.map