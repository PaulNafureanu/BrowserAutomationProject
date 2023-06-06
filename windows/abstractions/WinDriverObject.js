"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinDriverObject = void 0;
const selenium3_1 = require("selenium3");
class WinDriverObject {
    constructor(appId = WinDriverObject.calculatorAppId) {
        this.defaultCapabilities = (appName) => {
            return {
                browserName: "chrome",
                platformName: "windows",
                deviceName: "WindowsPC",
                app: appName,
            };
        };
        this.winDriver = new selenium3_1.Builder()
            .usingServer(WinDriverObject.driverUrl)
            .withCapabilities(this.defaultCapabilities(appId))
            .build();
    }
}
exports.WinDriverObject = WinDriverObject;
WinDriverObject.driverUrl = "http://127.0.0.1:4723/";
WinDriverObject.calculatorAppId = "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App";
//# sourceMappingURL=WinDriverObject.js.map