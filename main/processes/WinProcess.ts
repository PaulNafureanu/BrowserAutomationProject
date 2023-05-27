import { spawn, exec, execFile } from "node:child_process";

export class WinProcess {
  static runWinProcessInsideShell(winProcessName: string) {
    const process = spawn(winProcessName, { shell: true });

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

  static runWinProcessWithCMDDetached(winProcessName: string) {
    const command = "cmd.exe";
    const args = ["/c", winProcessName];
    const process = spawn(command, args, {
      shell: true,
      detached: true,
      stdio: "ignore",
    });

    process.unref();

    return process;
  }

  static killWinProcess(winProcessName: string, timeout: number = 500) {
    setTimeout(() => {
      const killCommand = `taskkill /IM ${winProcessName} /F`;
      spawn("cmd.exe", ["/c", killCommand]).unref();
    }, timeout);
  }
}
