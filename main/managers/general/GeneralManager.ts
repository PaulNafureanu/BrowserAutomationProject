import { ManagerObject } from "../abstractions/ManagerObject";

export class GeneralManager extends ManagerObject {
  private static instance: GeneralManager;
  private constructor() {
    super();
  }

  public static getInstance() {
    if (!GeneralManager.instance) {
      GeneralManager.instance = new GeneralManager();
    }
    return GeneralManager.instance;
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
