"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinDriverObject = void 0;
const WinProcess_1 = require("../../main/processes/WinProcess");
const selenium3_1 = require("selenium3");
class WinDriverObject {
    windowsDriverProcess = null;
    windowsDriver;
    static driverUrl = "http://localhost:4723";
    static driverPath = "C:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe";
    calculatorAppId = "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App";
    constructor() {
        this.windowsDriverProcess =
            WinProcess_1.WinProcess.runWinProcessInsideShell("winappdriver");
        this.windowsDriver = new selenium3_1.Builder()
            .usingServer(WinDriverObject.driverUrl)
            .withCapabilities(this.defaultCapabilities(this.calculatorAppId))
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
    quit() {
        this.windowsDriverProcess?.stdin.write("\n");
    }
    static windowsAppDriverCapabilities(appName) {
        browserName: "string";
        platformName: "string";
        deviceName: "string";
        app: "string";
    }
}
exports.WinDriverObject = WinDriverObject;
/**
 * import { Builder } from "selenium-webdriver";

const calculatorAppId = "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App";
const calculatorPath = "C:\\Windows\\System32\\calc.exe";

async function init() {
  let windowsDriver = await new Builder()
    .usingServer("http://127.0.0.1:4723/")
    .withCapabilities({
      browserName: "Chrome",
      platformName: "windows",
      deviceName: "WindowsPC",
      app: calculatorAppId,
    })
    .build();
}

init();

 *
 */
//# sourceMappingURL=WinDriverObject.js.map