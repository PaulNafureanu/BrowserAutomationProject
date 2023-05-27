import { By, until } from "selenium4.9";
import { WebPageObject } from "../../../abstractions/WebPageObject";
import {
  WebElementObject,
  WebLocator,
} from "../../../abstractions/WebElementObject";
import { Video } from "../others/Video";

export class YoutubeStudio extends WebPageObject {
  private static uploadButton: WebLocator = {
    IDLocator: "#upload-button",
    CSSLocator: "ytcp-button.ytcp-upload-video-button",
    CSSLocator2:
      "#align-experimental-badge .main-container ytcp-upload-video-button ytcp-button",
    CSSLocator3: ".main-container ytcp-upload-video-button ytcp-button",
    XPath:
      "/html/body/ytcp-app/ytcp-entity-page/div/div/main/div/ytcp-animatable[3]/ytcd-channel-dashboard/div[1]/div/ytcd-card-column[1]/ytcd-card/div/ytcd-basic-card/ytcd-item/ytcd-entity-snapshot-item/ytcd-video-snapshot-upload/div/div[3]/ytcp-upload-video-button/ytcp-button",
  };

  private static selectFiles: WebLocator = {
    IDLocator: "#select-files-button div",
    CSSLocator: "#content ytcp-button > div",
    CSSLocator2: "#content .ytcp-uploads-file-picker > div",
    CSSLocator3: "#content #animation #circle",
    XPath:
      "/html/body/ytcp-uploads-dialog/tp-yt-paper-dialog/div/ytcp-uploads-file-picker/div/ytcp-button/div",
  };

  private static bypassYoutubeStudioOldBrowser: WebLocator = {
    IDLocator: "",
    CSSLocator: "div.container > div.buttons",
    CSSLocator2: "body > .container > .buttons",
    CSSLocator3: "div.container  div.buttons a.button",
    XPath: "/html/body/div/div[5]/a",
  };

  public async uploadVideo(video: Video) {
    try {
      await new WebElementObject(
        this.webDriver,
        YoutubeStudio.uploadButton
      ).click();
    } catch (error) {
      await new WebElementObject(
        this.webDriver,
        YoutubeStudio.bypassYoutubeStudioOldBrowser
      ).click();
      await new WebElementObject(
        this.webDriver,
        YoutubeStudio.uploadButton
      ).click();
    }
    await new WebElementObject(
      this.webDriver,
      YoutubeStudio.selectFiles
    ).click();
  }
}
