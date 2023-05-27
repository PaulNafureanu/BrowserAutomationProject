"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinProcess = void 0;
const node_child_process_1 = require("node:child_process");
class WinProcess {
    static runWinProcessInsideShell(winProcessName) {
        const process = (0, node_child_process_1.spawn)(winProcessName, { shell: true });
        process.stdout.on("data", (data) => {
            console.log(`${data}`);
        });
        process.stderr.on("data", (data) => {
            console.error(`${data}`);
        });
        process.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
        });
        return process;
    }
    static runWinProcessWithCMDDetached(winProcessName) {
        const command = "cmd.exe";
        const args = ["/c", winProcessName];
        const process = (0, node_child_process_1.spawn)(command, args, {
            shell: true,
            detached: true,
            stdio: "ignore",
        });
        process.unref();
        return process;
    }
    static killWinProcess(winProcessName, timeout = 500) {
        setTimeout(() => {
            const killCommand = `taskkill /IM ${winProcessName} /F`;
            (0, node_child_process_1.spawn)("cmd.exe", ["/c", killCommand]).unref();
        }, timeout);
    }
}
exports.WinProcess = WinProcess;
//# sourceMappingURL=WinProcess.js.map