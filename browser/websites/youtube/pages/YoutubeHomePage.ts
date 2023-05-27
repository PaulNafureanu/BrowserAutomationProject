import { WebHomePageObject } from "../../../abstractions/pages/WebHomePageObject";
import { YoutubeAccountMenuComponent } from "../components/AccountMenuComponent";
import { YoutubeMastheadMenuComponent } from "../components/MastheadMenuComponent";

export class YoutubeHomePage extends WebHomePageObject {
  public getAccountMenu() {
    return new YoutubeAccountMenuComponent(this.webDriver);
  }
  public getMastheadMenu() {
    return new YoutubeMastheadMenuComponent(this.webDriver);
  }
}

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
