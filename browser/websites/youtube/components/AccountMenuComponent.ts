import { WebComponentObject } from "../../../abstractions/WebComponentObject";
import {
  WebElementObject,
  WebLocator,
} from "../../../abstractions/WebElementObject";

export class YoutubeAccountMenuComponent extends WebComponentObject {
  // Web locators for the composing web elements of the account menu component:

  private static accountMenuWebLocator: WebLocator = {
    IDLocator: "avatar-btn",
    CSSLocator: "#buttons .style-scope > button",
    CSSLocator2: "#end ytd-topbar-menu-button-renderer > button",
    CSSLocator3: "#buttons ytd-topbar-menu-button-renderer > button",
    XPath:
      "/html/body/ytd-app/div[1]/div/ytd-masthead/div[4]/div[3]/div[2]/ytd-topbar-menu-button-renderer[2]/button",
  };

  private static channelWebLocator: WebLocator = {
    IDLocator: "",
    CSSLocator: "#items > ytd-compact-link-renderer:nth-child(1)",
    CSSLocator2:
      "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(1)",
    CSSLocator3:
      "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(1) a",
    XPath:
      "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-multi-page-menu-renderer/div[3]/div[1]/yt-multi-page-menu-section-renderer[1]/div[2]/ytd-compact-link-renderer[1]",
  };

  private static studioWebLocator: WebLocator = {
    IDLocator: "",
    CSSLocator: "#items > ytd-compact-link-renderer:nth-child(2)",
    CSSLocator2:
      "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(2)",
    CSSLocator3:
      "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(2) a",
    XPath:
      "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-multi-page-menu-renderer/div[3]/div[1]/yt-multi-page-menu-section-renderer[1]/div[2]/ytd-compact-link-renderer[2]",
  };

  private static accountWebLocator: WebLocator = {
    IDLocator: "",
    CSSLocator: "#items > ytd-compact-link-renderer:nth-child(3)",
    CSSLocator2:
      "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(3)",
    CSSLocator3:
      "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(3) a",
    XPath:
      "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-multi-page-menu-renderer/div[3]/div[1]/yt-multi-page-menu-section-renderer[1]/div[2]/ytd-compact-link-renderer[3]",
  };

  private static signOutWebLocator: WebLocator = {
    IDLocator: "",
    CSSLocator: "#items > ytd-compact-link-renderer:nth-child(4)",
    CSSLocator2:
      "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(4)",
    CSSLocator3:
      "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(4) a",
    XPath:
      "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-multi-page-menu-renderer/div[3]/div[1]/yt-multi-page-menu-section-renderer[1]/div[2]/ytd-compact-link-renderer[4]",
  };

  private static signInWebLocator: WebLocator = {
    IDLocator: "",
    CSSLocator: "#buttons ytd-button-renderer yt-button-shape",
    CSSLocator2: "#end ytd-button-renderer yt-button-shape",
    CSSLocator3: "#end ytd-button-renderer yt-button-shape > a",
    XPath:
      "/html/body/ytd-app/div[1]/div/ytd-masthead/div[4]/div[3]/div[2]/ytd-button-renderer/yt-button-shape",
  };

  // Methods and behaviors of the account menu component:
  //TODO: Implement anc complete these methods
  public async openStudioPage() {
    const webLocator = YoutubeAccountMenuComponent.studioWebLocator;
    await new WebElementObject(this.webDriver, webLocator).click();
  }
  public async openChannelDashboardPage() {
    const webLocator = YoutubeAccountMenuComponent.channelWebLocator;
    await new WebElementObject(this.webDriver, webLocator).click();
  }
  public async changeAccount() {
    const webLocator = YoutubeAccountMenuComponent.accountWebLocator;
    await new WebElementObject(this.webDriver, webLocator).click();
  }
  public async signOut() {
    const webLocator = YoutubeAccountMenuComponent.signOutWebLocator;
    await new WebElementObject(this.webDriver, webLocator).click();
  }
  public async signIn() {
    const webLocator = YoutubeAccountMenuComponent.signInWebLocator;
    await new WebElementObject(this.webDriver, webLocator).click();
  }
}
