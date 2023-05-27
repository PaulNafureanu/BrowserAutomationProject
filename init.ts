import path from "node:path";
import { WebDriverObject } from "./browser/abstractions/WebDriverObject";
import { YoutubeWebSite } from "./browser/websites/youtube/YoutubeWebSite";
import { Video } from "./browser/websites/youtube/others/Video";
import { WinServer } from "./main/processes/WinServer";
import { WinProcess } from "./main/processes/WinProcess";

async function init() {
  const server = new WinServer();

  server.quitAfter(3000);

  // General demonstration of the websiteobject class:
  // const ytWebSite = new YoutubeWebSite();
  // const ytStudio = await ytWebSite.loadYoutubeStudio();
  // const videoFilePath = path.join(
  //   WebDriverObject.defaultWebDriverOptions.uploadDir + "sample.mp4"
  // );
  // await ytStudio.uploadVideo(new Video(videoFilePath));
  // ytWebSite.quitAfter(3000);
  // let count = 0;
  // const child = WinProcess.spawnSimpleShell("winappdriver");
  // setTimeout(() => {
  //   new WinDriverObject();
  // }, 1000);
}

init();
