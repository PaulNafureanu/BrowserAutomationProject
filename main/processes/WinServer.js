"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinServer = void 0;
const WinProcess_1 = require("./WinProcess");
class WinServer {
    static defaultWinServerOptions = {
        initWith: "CMDDetached",
    };
    process;
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
    quit() {
        WinProcess_1.WinProcess.killWinProcess("WinAppDriver.exe");
    }
    quitAfter(ms) {
        WinProcess_1.WinProcess.killWinProcess("WinAppDriver.exe", ms);
    }
}
exports.WinServer = WinServer;
//# sourceMappingURL=WinServer.js.map