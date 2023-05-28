"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const WinServer_1 = require("./main/processes/WinServer");
const WinDriverObject_1 = require("./windows/abstractions/WinDriverObject");
const selenium3_1 = require("selenium3");
async function init() {
    const server = new WinServer_1.WinServer();
    setTimeout(async () => {
        const { winDriver } = new WinDriverObject_1.WinDriverObject("Root");
        const title = await winDriver.getTitle();
        console.log(title);
        const openDialogXpath = '/Pane[@ClassName="#32769"][@Name="Desktop 1"]/Pane[@ClassName="Chrome_WidgetWin_1"][starts-with(@Name,"Channel dashboard - YouTube Studio - Google Chrome - Paul - Andr")]/Window[@ClassName="#32770"][@Name="Open"]/ComboBox[@ClassName="ComboBox"][@Name="File name:"]';
        const dis = await winDriver.findElements(selenium3_1.By.xpath(openDialogXpath));
        dis.forEach(async (d) => {
            await d.sendKeys("Helllloooo!!");
        });
    }, 2000);
    // server.quitAfter(5000);
    // General demonstration of the websiteobject class:
    // const ytWebSite = new YoutubeWebSite();
    // const ytStudio = await ytWebSite.loadYoutubeStudio();
    // const videoFilePath = path.join(
    //   WebDriverObject.defaultWebDriverOptions.uploadDir + "sample.mp4"
    // );
    // await ytStudio.uploadVideo(new Video(videoFilePath));
    // ytWebSite.quitAfter(3000);
}
init();
/**
 * Schedule a command to take a screenshot.
 * The driver makes a best effort to return a screenshot of the following, in order of preference.
 * @param fileName The file name with the extension (.png).
 * @param folderPath The folder path where the file should be saved.
 */
async function getScreenshotAsFile(driver, fileName = "screenshot.png", folderPath = "./test/") {
    const image = await driver.takeScreenshot();
    node_fs_1.default.writeFile(folderPath + fileName, image, "base64", (err) => {
        if (err)
            console.log("Error when saving the screenshot: " + err);
    });
}
/**
 * Schedules a command to retrieve the current page's source.
 * The page source returned is a representation of the underlying DOM.
 * @param fileName The file name with the extension (.html).
 * @param folderPath The folder path where the HTML DOM file should be saved.
 */
async function getPageSourceAsFile(driver, fileName = "index.html", folderPath = "./test/") {
    const pageSource = await driver.getPageSource();
    node_fs_1.default.writeFile(folderPath + fileName, pageSource, "utf-8", (err) => {
        if (err)
            console.log("Error when saving the page source: " + err);
    });
}
//# sourceMappingURL=init.js.map