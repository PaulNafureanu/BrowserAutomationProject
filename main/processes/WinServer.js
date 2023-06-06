"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinServer = void 0;
const WinProcess_1 = require("./WinProcess");
/**
 * It starts the Windows Application Driver server listening for requests at: http://127.0.0.1:4723/
 * The WinAppDriver is a Windows interface useful at automating windows apps and forms similar with a WebDriver.
 * Please make sure that the Windows machine being automated has
 * the path for WinAppDriver in the Environment Variables set correctly.
 */
class WinServer {
    /**
     * It starts the Windows Server with the Windows Application Driver running and listening for requests.
     * @param options Windows Server Options that sets how the WinServer initiates itself.
     */
    constructor(options = WinServer.defaultWinServerOptions) {
        switch (options.initWith) {
            case "InsideShell": {
                this.process = WinProcess_1.WinProcess.runWinProcessInsideShell("WinAppDriver.exe");
                break;
            }
            case "CMDDetached": {
                this.process =
                    WinProcess_1.WinProcess.runWinProcessWithCMDDetached("WinAppDriver.exe");
                break;
            }
            default: {
                this.process =
                    WinProcess_1.WinProcess.runWinProcessWithCMDDetached("WinAppDriver.exe");
                break;
            }
        }
    }
    /**
     * It quits the Windows Server killing the Windows Application Driver process immediately.
     */
    quit() {
        WinProcess_1.WinProcess.killWinProcess("WinAppDriver.exe");
    }
    /**
     * It quits the Windows Server killing the Windows Application Driver process after some timeout.
     * @param ms The timeout in ms.
     */
    quitAfter(ms) {
        WinProcess_1.WinProcess.killWinProcess("WinAppDriver.exe", ms);
    }
}
exports.WinServer = WinServer;
WinServer.defaultWinServerOptions = {
    initWith: "CMDDetached",
};
//# sourceMappingURL=WinServer.js.map