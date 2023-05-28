import { WinProcess } from "./WinProcess";

interface WinServerOptions {
  initWith: "InsideShell" | "CMDDetached";
}

/**
 * It starts the Windows Application Driver server listening for requests at: http://127.0.0.1:4723/
 * The WinAppDriver is a Windows interface useful at automating windows apps and forms similar with a WebDriver.
 * Please make sure that the Windows machine being automated has
 * the path for WinAppDriver in the Environment Variables set correctly.
 */
export class WinServer {
  static readonly defaultWinServerOptions: WinServerOptions = {
    initWith: "CMDDetached",
  };
  private process;

  /**
   * It starts the Windows Server with the Windows Application Driver running and listening for requests.
   * @param options Windows Server Options that sets how the WinServer initiates itself.
   */
  constructor(options: WinServerOptions = WinServer.defaultWinServerOptions) {
    switch (options.initWith) {
      case "InsideShell": {
        this.process = WinProcess.runWinProcessInsideShell("WinAppDriver.exe");
        break;
      }
      case "CMDDetached": {
        this.process =
          WinProcess.runWinProcessWithCMDDetached("WinAppDriver.exe");
        break;
      }
      default: {
        this.process =
          WinProcess.runWinProcessWithCMDDetached("WinAppDriver.exe");
        break;
      }
    }
  }

  /**
   * It quits the Windows Server killing the Windows Application Driver process immediately.
   */
  quit() {
    WinProcess.killWinProcess("WinAppDriver.exe");
  }

  /**
   * It quits the Windows Server killing the Windows Application Driver process after some timeout.
   * @param ms The timeout in ms.
   */
  quitAfter(ms: number) {
    WinProcess.killWinProcess("WinAppDriver.exe", ms);
  }
}
