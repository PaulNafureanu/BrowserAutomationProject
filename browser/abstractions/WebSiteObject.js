"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSiteObject = void 0;
const WebDriverObject_1 = require("./WebDriverObject");
const WebHomePageObject_1 = require("./pages/WebHomePageObject");
/**
 * It creates WebSite Objects that will contain the general representation of websites, the navigation and their page objects.
 */
class WebSiteObject {
    /**
     * Construct and return a WebSite object to navigate within.
     * @param     {WebSiteObject}    options     Give external options for the session and the construction of website object.
     */
    constructor(options = WebSiteObject.defaultWebSiteOptions) {
        // The url of our website object
        this.webSiteURL = "";
        this.webSiteState = {
            webDriver: new WebDriverObject_1.WebDriverObject(options.webDriverOptions),
            implicitWait: options.implicitWait,
        };
        this.URLs = {
            HomePage: this.webSiteURL,
        };
        this.pages = {
            HomePage: new WebHomePageObject_1.WebHomePageObject(this.webSiteURL, this.webSiteState.webDriver),
        };
    }
    /**
     * Schedules a command to navigate to the url of the website.
     * @return A promise that will be resolved when the document has finished loading.
     */
    async loadWebSite(targetUrl) {
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
    async isWebSiteLoaded(targetUrl) {
        // Check if the url of the loaded page is the same as the defined url of the website.
        const { webDriver } = this.webSiteState;
        const currentUrl = await webDriver.getCurrentUrl();
        if (targetUrl !== currentUrl) {
            await this.quit();
            throw new Error("Not on the specified page of the website '" +
                targetUrl +
                "'. Current page is: '" +
                currentUrl +
                "'");
        }
    }
    /**
     * Schedules a command to load a page object.
     * @return A promise that will be resolved when the page object has finished loading.
     * It throws an error and quits the session if the page object is not loaded correctly.
     */
    async loadPage(page) {
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
    async getCurrentPageByPageKey() {
        const { webDriver } = this.webSiteState;
        const { pages } = this;
        const currentUrl = await webDriver.getCurrentUrl();
        let pageKey;
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
    async load() {
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
    async back() {
        const { webDriver } = this.webSiteState;
        await webDriver.back();
        return await this.getCurrentPageByPageKey();
    }
    /**
     * Schedules a command to move forwards in the chrome browser history.
     * @return A promise that will be resolved when the navigation event has completed.
     * It contains the next page object in browser history or undefined if the page is not recognized in the website.
     */
    async forward() {
        const { webDriver } = this.webSiteState;
        await webDriver.forward();
        return await this.getCurrentPageByPageKey();
    }
    /**
     * Schedules a command to refresh the current page.
     * @return A promise that will be resolved when the navigation event has completed.
     * It contains the current page object in browser history or undefined if the page is not recognized in the website.
     */
    async refresh() {
        const { webDriver } = this.webSiteState;
        await webDriver.refresh();
        return await this.getCurrentPageByPageKey();
    }
    /**
     * Schedules a command to quit the current session of the website. After calling quit,
     * this instance will be invalidated and may no longer be used to issue commands against the website.
     * @return A promise that will be resolved when the command has completed.
     */
    quit() {
        const { webDriver } = this.webSiteState;
        return webDriver.quit();
    }
    /**
     * Schedules a command to quit the current session of the website after a number of milliseconds. After calling quit,
     * this instance will be invalidated and may no longer be used to issue commands against the website.
     * @param {number} ms the timeout in ms.
     * @return A promise that will be resolved when the command has completed.
     */
    quitAfter(ms) {
        const { webDriver } = this.webSiteState;
        webDriver.quitAfter(ms);
    }
}
exports.WebSiteObject = WebSiteObject;
// The states and defaults of the website object
WebSiteObject.defaultWebSiteOptions = {
    webDriverOptions: WebDriverObject_1.WebDriverObject.defaultWebDriverOptions,
    implicitWait: 0,
};
//# sourceMappingURL=WebSiteObject.js.map