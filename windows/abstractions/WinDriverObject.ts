import { Builder, ThenableWebDriver, Capabilities } from "selenium3";

export class WinDriverObject {
  public winDriver: ThenableWebDriver;
  private static driverUrl = "http://127.0.0.1:4723/";
  static calculatorAppId = "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App";

  constructor(appId: string = WinDriverObject.calculatorAppId) {
    this.winDriver = new Builder()
      .usingServer(WinDriverObject.driverUrl)
      .withCapabilities(this.defaultCapabilities(appId))
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
}
