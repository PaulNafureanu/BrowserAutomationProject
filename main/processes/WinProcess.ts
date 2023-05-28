import {
  spawn,
  exec,
  execFile,
  ChildProcessWithoutNullStreams,
  ChildProcess,
} from "node:child_process";

/**
 * It manages node child processes that run and kill Windows Processes in a Windows machine.
 * Node processes that are able to execute different exe files and commands.
 */
export class WinProcess {
  /**
   * It starts Windows processes in the current shell without any command-line arguments.
   * @param winProcessName The Windows process name that should be started by the node process. (E.g: "WinAppDriver.exe")
   * @returns {ChildProcessWithoutNullStreams} A node child process that started the above Windows exe file in the current shell.
   */
  static runWinProcessInsideShell(
    winProcessName: string
  ): ChildProcessWithoutNullStreams {
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

  /**
   * It starts Windows processes in a new CMD shell without any command-line arguments.
   * @param winProcessName The Windows process name that should be started by the node process. (E.g:"WinAppDriver.exe")
   * @returns {ChildProcess} A node child process that started the above Windows exe file.
   */
  static runWinProcessWithCMDDetached(winProcessName: string): ChildProcess {
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

  /**
   * It kills all the Windows processes in a Windows machine using taskkill process name command from a shell.
   * @param winProcessName The Windows process name that should be killed. (E.g:"WinAppDriver.exe")
   */
  static killWinProcess(winProcessName: string, timeout: number = 500) {
    setTimeout(() => {
      const killCommand = `taskkill /IM ${winProcessName} /F`;
      spawn("cmd.exe", ["/c", killCommand]).unref();
    }, timeout);
  }
}
