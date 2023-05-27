"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WinServer_1 = require("./main/processes/WinServer");
async function init() {
    const server = new WinServer_1.WinServer();
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
//# sourceMappingURL=init.js.map