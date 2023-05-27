import { WinProcess } from "./WinProcess";

interface WinServerOptions {
  initWith: "InsideShell" | "CMDDetached";
}

export class WinServer {
  static readonly defaultWinServerOptions: WinServerOptions = {
    initWith: "CMDDetached",
  };
  private process;

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

  quit() {
    WinProcess.killWinProcess("WinAppDriver.exe");
  }

  quitAfter(ms: number) {
    WinProcess.killWinProcess("WinAppDriver.exe", ms);
  }
}
