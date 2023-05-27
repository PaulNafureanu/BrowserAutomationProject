import { WebDriverObject, WebDriverOptions } from "./WebDriverObject";
import { WebPageObject } from "./WebPageObject";
import { WebHomePageObject } from "./pages/WebHomePageObject";

/**
 * Defines the options type (props) for the constructor of the WebSiteObject class.
 */
export interface WebSiteOptions {
  implicitWait: number;
  webDriverOptions: WebDriverOptions;
}

/**
 * Defines the state interface for the WebSite Object.
 */
interface WebSiteState {
  webDriver: WebDriverObject;
  implicitWait: number;
}

/**
 * It creates WebSite Objects that will contain the general representation of websites, the navigation and their page objects.
 */
export class WebSiteObject {
  // The states and defaults of the website object
  static readonly defaultWebSiteOptions: WebSiteOptions = {
    webDriverOptions: WebDriverObject.defaultWebDriverOptions,
    implicitWait: 0,
  };

  // The url of our website object
  protected webSiteURL = "";

  // Web Site State (urls and pages) used for this website object
  protected webSiteState: WebSiteState;
  protected URLs: { HomePage: string };
  protected pages: { HomePage: WebHomePageObject };

  /**
   * Construct and return a WebSite object to navigate within.
   * @param     {WebSiteObject}    options     Give external options for the session and the construction of website object.
   */
  constructor(options: WebSiteOptions = WebSiteObject.defaultWebSiteOptions) {
    this.webSiteState = {
      webDriver: new WebDriverObject(options.webDriverOptions),
      implicitWait: options.implicitWait,
    };

    this.URLs = {
      HomePage: this.webSiteURL,
    };

    this.pages = {
      HomePage: new WebHomePageObject(
        this.webSiteURL,
        this.webSiteState.webDriver
      ),
    };
  }

  /**
   * Schedules a command to navigate to the url of the website.
   * @return A promise that will be resolved when the document has finished loading.
   */
  protected async loadWebSite(targetUrl: string) {
    const { implicitWait } = this.webSiteState;
    const { webDriver } = this.webSiteState;

    await webDriver.get(targetUrl);
    await webDriver.setImplicitWait(implicitWait);
  }

  /**
   * Schedules a command to test if the website loaded correctly.
   * @return A promise that will be resolved when the document has finished loading.
   * It throws an error and quits the session if the website is not loaded correctly.
   */
  protected async isWebSiteLoaded(targetUrl: string) {
    // Check if the url of the loaded page is the same as the defined url of the website.
    const { webDriver } = this.webSiteState;
    const currentUrl = await webDriver.getCurrentUrl();

    if (targetUrl !== currentUrl) {
      await this.quit();
      throw new Error(
        "Not on the specified page of the website '" +
          targetUrl +
          "'. Current page is: '" +
          currentUrl +
          "'"
      );
    }
  }

  /**
   * Schedules a command to load a page object.
   * @return A promise that will be resolved when the page object has finished loading.
   * It throws an error and quits the session if the page object is not loaded correctly.
   */
  protected async loadPage(page: WebPageObject) {
    const { webDriver } = this.webSiteState;
    await webDriver.windowMinMax("maximize");
    await this.loadWebSite(page.url);
    await this.isWebSiteLoaded(page.url);
    if (page === this.pages.HomePage)
      this.pages.HomePage.acceptCookiesIfTheyExists(); //TODO: see if you need await after implementation
    return page;
  }

  /**
   * Schedules a command to return the current page object using the current url.
   * @returns A promise that contains the current page object or undefined.
   */
  protected async getCurrentPageByPageKey() {
    const { webDriver } = this.webSiteState;
    const { pages } = this;
    const currentUrl = await webDriver.getCurrentUrl();

    let pageKey: keyof typeof pages;
    for (pageKey in pages) {
      if (pages[pageKey].url === currentUrl) {
        return pages[pageKey];
      }
    }
  }

  /**
   * Schedules a command to load the website.
   * @return A promise that will be resolved when the document has finished loading.
   * It throws an error and quits the session if the website is not loaded correctly.
   */
  public async load() {
    const { webDriver } = this.webSiteState;
    const homepage = this.pages.HomePage;

    await webDriver.windowMinMax("maximize");
    await this.loadWebSite(homepage.url);
    await this.isWebSiteLoaded(homepage.url);
    homepage.acceptCookiesIfTheyExists(); //TODO: see if you need await after implementation
    return homepage;
  }

  /**
   * Schedules a command to move backwards in the chrome browser history.
   * @return A promise that will be resolved when the navigation event has completed.
   * It contains the previous page object in browser history or undefined if the page is not recognized in the website.
   */
  public async back(): Promise<WebPageObject | undefined> {
    const { webDriver } = this.webSiteState;

    await webDriver.back();
    return await this.getCurrentPageByPageKey();
  }

  /**
   * Schedules a command to move forwards in the chrome browser history.
   * @return A promise that will be resolved when the navigation event has completed.
   * It contains the next page object in browser history or undefined if the page is not recognized in the website.
   */
  public async forward(): Promise<WebPageObject | undefined> {
    const { webDriver } = this.webSiteState;

    await webDriver.forward();
    return await this.getCurrentPageByPageKey();
  }

  /**
   * Schedules a command to refresh the current page.
   * @return A promise that will be resolved when the navigation event has completed.
   * It contains the current page object in browser history or undefined if the page is not recognized in the website.
   */
  public async refresh(): Promise<WebPageObject | undefined> {
    const { webDriver } = this.webSiteState;

    await webDriver.refresh();
    return await this.getCurrentPageByPageKey();
  }

  /**
   * Schedules a command to quit the current session of the website. After calling quit,
   * this instance will be invalidated and may no longer be used to issue commands against the website.
   * @return A promise that will be resolved when the command has completed.
   */
  public quit() {
    const { webDriver } = this.webSiteState;
    return webDriver.quit();
  }

  /**
   * Schedules a command to quit the current session of the website after a number of milliseconds. After calling quit,
   * this instance will be invalidated and may no longer be used to issue commands against the website.
   * @param {number} ms the timeout in ms.
   * @return A promise that will be resolved when the command has completed.
   */
  public quitAfter(ms: number) {
    const { webDriver } = this.webSiteState;
    webDriver.quitAfter(ms);
  }
}
