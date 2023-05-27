import { ChildProcessWithoutNullStreams } from "node:child_process";
import { WinProcess } from "../../main/processes/WinProcess";
import { Builder, ThenableWebDriver, Capabilities } from "selenium3";

export class WinDriverObject {
  private windowsDriverProcess: ChildProcessWithoutNullStreams | null = null;
  private windowsDriver: ThenableWebDriver;
  private static driverUrl = "http://localhost:4723";
  private static driverPath =
    "C:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe";

  calculatorAppId = "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App";

  constructor() {
    this.windowsDriverProcess =
      WinProcess.runWinProcessInsideShell("winappdriver");
    this.windowsDriver = new Builder()
      .usingServer(WinDriverObject.driverUrl)
      .withCapabilities(this.defaultCapabilities(this.calculatorAppId))
      .build();
  }

  private defaultCapabilities = (appName: string) => {
    return {
      browserName: "chrome",
      platformName: "windows",
      deviceName: "WindowsPC",
      app: appName,
    };
  };

  public quit() {
    this.windowsDriverProcess?.stdin.write("\n");
  }

  public static windowsAppDriverCapabilities(appName: string) {
    browserName: "string";
    platformName: "string";
    deviceName: "string";
    app: "string";
  }
}

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
