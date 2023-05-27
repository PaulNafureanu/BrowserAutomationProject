"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeHomePage = void 0;
const WebHomePageObject_1 = require("../../../abstractions/pages/WebHomePageObject");
const AccountMenuComponent_1 = require("../components/AccountMenuComponent");
const MastheadMenuComponent_1 = require("../components/MastheadMenuComponent");
class YoutubeHomePage extends WebHomePageObject_1.WebHomePageObject {
    getAccountMenu() {
        return new AccountMenuComponent_1.YoutubeAccountMenuComponent(this.webDriver);
    }
    getMastheadMenu() {
        return new MastheadMenuComponent_1.YoutubeMastheadMenuComponent(this.webDriver);
    }
}
exports.YoutubeHomePage = YoutubeHomePage;
//
/**
 * get youtube account menu (component) (the right menu):
 * - click on Youtube studio
 * - click on Your Channel
 * - click on Change Account
 * - click on Sign out
 *
 * get youtube master head menu (component) (the left menu):
 * - click on Home
 * - click on Shorts
 * - click on Subscriptions
 * - click on Library
 */
//# sourceMappingURL=YoutubeHomePage.js.map