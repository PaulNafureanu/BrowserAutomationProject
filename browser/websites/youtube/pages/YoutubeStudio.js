"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeStudio = void 0;
const WebPageObject_1 = require("../../../abstractions/WebPageObject");
const WebElementObject_1 = require("../../../abstractions/WebElementObject");
class YoutubeStudio extends WebPageObject_1.WebPageObject {
    async uploadVideo(video) {
        try {
            await new WebElementObject_1.WebElementObject(this.webDriver, YoutubeStudio.uploadButton).click();
        }
        catch (error) {
            await new WebElementObject_1.WebElementObject(this.webDriver, YoutubeStudio.bypassYoutubeStudioOldBrowser).click();
            await new WebElementObject_1.WebElementObject(this.webDriver, YoutubeStudio.uploadButton).click();
        }
        await new WebElementObject_1.WebElementObject(this.webDriver, YoutubeStudio.selectFiles).click();
    }
}
exports.YoutubeStudio = YoutubeStudio;
YoutubeStudio.uploadButton = {
    IDLocator: "#upload-button",
    CSSLocator: "ytcp-button.ytcp-upload-video-button",
    CSSLocator2: "#align-experimental-badge .main-container ytcp-upload-video-button ytcp-button",
    CSSLocator3: ".main-container ytcp-upload-video-button ytcp-button",
    XPath: "/html/body/ytcp-app/ytcp-entity-page/div/div/main/div/ytcp-animatable[3]/ytcd-channel-dashboard/div[1]/div/ytcd-card-column[1]/ytcd-card/div/ytcd-basic-card/ytcd-item/ytcd-entity-snapshot-item/ytcd-video-snapshot-upload/div/div[3]/ytcp-upload-video-button/ytcp-button",
};
YoutubeStudio.selectFiles = {
    IDLocator: "#select-files-button div",
    CSSLocator: "#content ytcp-button > div",
    CSSLocator2: "#content .ytcp-uploads-file-picker > div",
    CSSLocator3: "#content #animation #circle",
    XPath: "/html/body/ytcp-uploads-dialog/tp-yt-paper-dialog/div/ytcp-uploads-file-picker/div/ytcp-button/div",
};
YoutubeStudio.bypassYoutubeStudioOldBrowser = {
    IDLocator: "",
    CSSLocator: "div.container > div.buttons",
    CSSLocator2: "body > .container > .buttons",
    CSSLocator3: "div.container  div.buttons a.button",
    XPath: "/html/body/div/div[5]/a",
};
//# sourceMappingURL=YoutubeStudio.js.map