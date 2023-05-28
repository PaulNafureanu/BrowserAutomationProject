"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinDriverObject = void 0;
const selenium3_1 = require("selenium3");
class WinDriverObject {
    winDriver;
    static driverUrl = "http://127.0.0.1:4723/";
    static calculatorAppId = "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App";
    constructor(appId = WinDriverObject.calculatorAppId) {
        this.winDriver = new selenium3_1.Builder()
            .usingServer(WinDriverObject.driverUrl)
            .withCapabilities(this.defaultCapabilities(appId))
            .build();
    }
    defaultCapabilities = (appName) => {
        return {
            browserName: "chrome",
            platformName: "windows",
            deviceName: "WindowsPC",
            app: appName,
        };
    };
}
exports.WinDriverObject = WinDriverObject;
//# sourceMappingURL=WinDriverObject.js.map