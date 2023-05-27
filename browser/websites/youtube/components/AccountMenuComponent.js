"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeAccountMenuComponent = void 0;
const WebComponentObject_1 = require("../../../abstractions/WebComponentObject");
const WebElementObject_1 = require("../../../abstractions/WebElementObject");
class YoutubeAccountMenuComponent extends WebComponentObject_1.WebComponentObject {
    // Web locators for the composing web elements of the account menu component:
    static accountMenuWebLocator = {
        IDLocator: "avatar-btn",
        CSSLocator: "#buttons .style-scope > button",
        CSSLocator2: "#end ytd-topbar-menu-button-renderer > button",
        CSSLocator3: "#buttons ytd-topbar-menu-button-renderer > button",
        XPath: "/html/body/ytd-app/div[1]/div/ytd-masthead/div[4]/div[3]/div[2]/ytd-topbar-menu-button-renderer[2]/button",
    };
    static channelWebLocator = {
        IDLocator: "",
        CSSLocator: "#items > ytd-compact-link-renderer:nth-child(1)",
        CSSLocator2: "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(1)",
        CSSLocator3: "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(1) a",
        XPath: "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-multi-page-menu-renderer/div[3]/div[1]/yt-multi-page-menu-section-renderer[1]/div[2]/ytd-compact-link-renderer[1]",
    };
    static studioWebLocator = {
        IDLocator: "",
        CSSLocator: "#items > ytd-compact-link-renderer:nth-child(2)",
        CSSLocator2: "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(2)",
        CSSLocator3: "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(2) a",
        XPath: "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-multi-page-menu-renderer/div[3]/div[1]/yt-multi-page-menu-section-renderer[1]/div[2]/ytd-compact-link-renderer[2]",
    };
    static accountWebLocator = {
        IDLocator: "",
        CSSLocator: "#items > ytd-compact-link-renderer:nth-child(3)",
        CSSLocator2: "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(3)",
        CSSLocator3: "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(3) a",
        XPath: "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-multi-page-menu-renderer/div[3]/div[1]/yt-multi-page-menu-section-renderer[1]/div[2]/ytd-compact-link-renderer[3]",
    };
    static signOutWebLocator = {
        IDLocator: "",
        CSSLocator: "#items > ytd-compact-link-renderer:nth-child(4)",
        CSSLocator2: "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(4)",
        CSSLocator3: "ytd-popup-container tp-yt-iron-dropdown #items > ytd-compact-link-renderer:nth-child(4) a",
        XPath: "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-multi-page-menu-renderer/div[3]/div[1]/yt-multi-page-menu-section-renderer[1]/div[2]/ytd-compact-link-renderer[4]",
    };
    static signInWebLocator = {
        IDLocator: "",
        CSSLocator: "#buttons ytd-button-renderer yt-button-shape",
        CSSLocator2: "#end ytd-button-renderer yt-button-shape",
        CSSLocator3: "#end ytd-button-renderer yt-button-shape > a",
        XPath: "/html/body/ytd-app/div[1]/div/ytd-masthead/div[4]/div[3]/div[2]/ytd-button-renderer/yt-button-shape",
    };
    // Methods and behaviors of the account menu component:
    //TODO: Implement anc complete these methods
    async openStudioPage() {
        const webLocator = YoutubeAccountMenuComponent.studioWebLocator;
        await new WebElementObject_1.WebElementObject(this.webDriver, webLocator).click();
    }
    async openChannelDashboardPage() {
        const webLocator = YoutubeAccountMenuComponent.channelWebLocator;
        await new WebElementObject_1.WebElementObject(this.webDriver, webLocator).click();
    }
    async changeAccount() {
        const webLocator = YoutubeAccountMenuComponent.accountWebLocator;
        await new WebElementObject_1.WebElementObject(this.webDriver, webLocator).click();
    }
    async signOut() {
        const webLocator = YoutubeAccountMenuComponent.signOutWebLocator;
        await new WebElementObject_1.WebElementObject(this.webDriver, webLocator).click();
    }
    async signIn() {
        const webLocator = YoutubeAccountMenuComponent.signInWebLocator;
        await new WebElementObject_1.WebElementObject(this.webDriver, webLocator).click();
    }
}
exports.YoutubeAccountMenuComponent = YoutubeAccountMenuComponent;
//# sourceMappingURL=AccountMenuComponent.js.map