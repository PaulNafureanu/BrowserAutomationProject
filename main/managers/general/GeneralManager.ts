import { WinServer } from "../../processes/WinServer";
import { UserCommandInput } from "../user/UserManager";
import { CommandType } from "../user/commands/CommandDefiner";
import { Process } from "./Process";

/**
 * App Session = Input + Process + Ouput + Logger.
 * One session -> process1 + process2 + ... -> stage11 + stage12 + ... + stage21 + stage22 + ...
 *
 * A run (or a session) of the BAP App consists of:
 * - Capturing the input: Responsibility delegated to the User Manager.
 * - Processing the input: Responsibility delegated to the General Manager.
 * - Generating the output: Responsibility delegated to the Browser and Windows Manager.
 * - Logging the details of the run: Responsibility delegated to the Log Manager.
 *
 * One session can be composed of multiple processes that run either in parallel or sequentially.
 * Each process, in turn, consists of different sequential stages. In other words:
 * The session is made up of individual processes, and these processes can either run concurrently (in parallel)
 * or one after the other (sequentially). Furthermore, each process can be further broken down
 * into different sequential stages (steps), representing the steps or components within that process.
 */

export class GeneralManager {
  private static processes: Process[] = [];
  private static server: WinServer | undefined;
  private constructor() {}

  // Set the initial values for the current session of the app.
  private static setup() {
    console.log("Setup started");
    return new WinServer();
  }

  private static async process<F extends keyof typeof Process>(
    func: Exclude<F, "prototype">
  ) {
    const processInstance = new Process();
    GeneralManager.processes.push(processInstance);
    await Process[func](processInstance)
      .catch((err) => console.log(err))
      .finally(() =>
        GeneralManager.processes.filter((p) => p.id !== processInstance.id)
      );
  }

  // Clean the session's app
  private static cleanup(server: WinServer) {
    console.log("Cleanup started");
    server.quit();
  }

  // Run the command in this session
  public static run<CT extends CommandType>(
    userCommandInput: UserCommandInput<CT>
  ) {
    // Run the setup for initialization of the session, if it is for the first time:
    if (!GeneralManager.server) GeneralManager.server = GeneralManager.setup();

    // Manage processes
    const { commandInput, commandType } = userCommandInput;

    switch (commandType.CommandName) {
      case "UndefinedCommand": {
        return;
      }
      case "SimpleUserCommand": {
        GeneralManager.process("start");
        break;
      }
      default: {
        const _checkNever: never = commandType;
      }
    }

    // Close the session, if there are no processes left to run
    if (GeneralManager.processes.length === 0)
      GeneralManager.cleanup(GeneralManager.server);
  }
}

// import path from "node:path";
// import fs from "node:fs";
// import { WebDriverObject } from "./browser/abstractions/WebDriverObject";
// import { YoutubeWebSite } from "./browser/websites/youtube/YoutubeWebSite";
// import { Video } from "./browser/websites/youtube/others/Video";
// import { WinServer } from "./main/processes/WinServer";
// import { WinProcess } from "./main/processes/WinProcess";
// import { WinDriverObject } from "./windows/abstractions/WinDriverObject";
// import { By, ThenableWebDriver, until } from "selenium3";
// import { ManagerObject } from "./main/managers/abstractions/ManagerObject";
// import { GeneralManager } from "./main/managers/GeneralManager";

// GeneralManager.execute()
// const server = new WinServer();
//Wait until WinServer is running, then send a signal from the WinServer that it is runnig.
// const { winDriver: winDriver1 } = new WinDriverObject("Root");
// const title1 = await winDriver1.getTitle();
// console.log(title1);
// const { winDriver: winDriver2 } = new WinDriverObject("Root");
// const title2 = await winDriver2.getTitle();
// console.log(title2);
//To close the WinServer, send the signal to close it after making sure that no other WinDriver operations are happening / running
// server.quitAfter(3000);
// setTimeout(async () => {
//   const { winDriver } = new WinDriverObject("Root");
//   const title = await winDriver.getTitle();
//   console.log(title);
//   const openDialogXpath =
//     '/Pane[@ClassName="#32769"][@Name="Desktop 1"]/Pane[@ClassName="Chrome_WidgetWin_1"][starts-with(@Name,"Channel dashboard - YouTube Studio - Google Chrome - Paul - Andr")]/Window[@ClassName="#32770"][@Name="Open"]/ComboBox[@ClassName="ComboBox"][@Name="File name:"]';
//   const dis = await winDriver.findElements(By.xpath(openDialogXpath));
//   dis.forEach(async (d) => {
//     await d.sendKeys("Helllloooo!!");
//   });
// }, 2000);
// server.quitAfter(5000);
// General demonstration of the websiteobject class:
// const ytWebSite = new YoutubeWebSite();
// const ytStudio = await ytWebSite.loadYoutubeStudio();
// const videoFilePath = path.join(
//   WebDriverObject.defaultWebDriverOptions.uploadDir + "sample.mp4"
// );
// await ytStudio.uploadVideo(new Video(videoFilePath));
// ytWebSite.quitAfter(3000);
