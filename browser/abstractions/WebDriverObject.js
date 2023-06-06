"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebDriverObject = void 0;
const path = require("node:path");
const fs = require("node:fs");
const selenium4_1 = require("selenium4");
const chrome_1 = require("selenium4/chrome");
/**
 * It creates Chrome WebDriver objects to control the Chrome browser.
 */
class WebDriverObject {
    /**
     * Construct and return a Chrome WebDriver object to start a session with a Chrome browser and control it.
     * @param     {WebDriverOptions}    options     Give options to the chrome webdriver.
     * @return                                      Returns a chrome thenable web driver instance.
     */
    constructor(options) {
        this.currentWebDriverOptions = WebDriverObject.defaultWebDriverOptions;
        // Set default options if they are not given.
        if (options)
            this.currentWebDriverOptions = options;
        // Create a builder for chrome web driver
        const builder = new selenium4_1.Builder().forBrowser("chrome");
        // Define the path to download and userdata directories
        const { userdataDir, downloadDir, userProfile, isHeadless } = this.currentWebDriverOptions;
        // Define and set chrome builder options
        const chromeOptions = new chrome_1.Options()
            .setUserPreferences({ "download.default_directory": downloadDir })
            .addArguments(`user-data-dir=${userdataDir}`)
            .addArguments(`profile-directory=${userProfile}`)
            .addArguments("window-size=1366,768")
            .excludeSwitches("enable-logging");
        if (isHeadless) {
            chromeOptions.headless();
        }
        builder.setChromeOptions(chromeOptions);
        //Create the chrome web driver in fullscreen
        this.chromeWebDriver = builder.build();
    }
    /**
     *  Enlarge or hide the browser's window.
     * @param   {"maximize" | "minimize"}    operation  Set the operation for the window: maximize or minimize.
     */
    async windowMinMax(operation) {
        if (operation === "maximize")
            await this.chromeWebDriver.manage().window().maximize();
        else
            await this.chromeWebDriver.manage().window().minimize();
    }
    /**
     * Schedules a command to navigate to the given URL.
     * @param     {string}    url     The fully qualified URL to open. Defaults to google.com.
     * @return                        A promise that will be resolved when the document has finished loading.
     */
    get(url) {
        if (!url)
            url = "https://www.google.com/";
        return this.chromeWebDriver.get(url);
    }
    /**
     * Schedules a command to retrieve the URL of the current page.
     * @return A promise that will be resolved with the current URL.
     */
    getCurrentUrl() {
        return this.chromeWebDriver.getCurrentUrl();
    }
    /**
     * Schedule a command to take a screenshot.
     * The driver makes a best effort to return a screenshot of the following, in order of preference.
     * @param fileName The file name with the extension (.png).
     * @param folderPath The folder path where the file should be saved.
     */
    async getScreenshotAsFile(fileName = "screenshot.png", folderPath = this.currentWebDriverOptions.screenshotsDir) {
        const image = await this.chromeWebDriver.takeScreenshot();
        fs.writeFile(folderPath + fileName, image, "base64", (err) => {
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
    async getPageSourceAsFile(fileName = "index.html", folderPath = this.currentWebDriverOptions.pageSourcesDir) {
        const pageSource = await this.chromeWebDriver.getPageSource();
        fs.writeFile(folderPath + fileName, pageSource, "utf-8", (err) => {
            if (err)
                console.log("Error when saving the page source: " + err);
        });
    }
    /**
     * Schedule a command to find an element on the page.
     * If the element cannot be found, a bot.ErrorCode.NO_SUCH_ELEMENT result will be returned by the driver.
     * @param locator a locator object that identifies the web element.
     * @returns A promise that will resolve to an web element if found on the webpage.
     */
    findElement(locator) {
        return this.chromeWebDriver.findElement(locator);
    }
    /**
     * Schedule a command to search for multiple web elements on the webpage.
     * @param locator a locator object that identifies the web elements.
     * @returns A promise that will resolve to an array of WebElements.
     */
    findElements(locator) {
        return this.chromeWebDriver.findElements(locator);
    }
    /**
     * Set an implicit wait for the session of this web driver.
     * Warning: Do not mix implicit and explicit waits.
     * @param     {number}     ms    the timeout in ms.
     * @returns                      A promise that will be resolved when the command has completed.
     */
    setImplicitWait(ms) {
        return this.chromeWebDriver.manage().setTimeouts({ implicit: ms });
    }
    /**
     * Schedules a command to move backwards in the chrome browser history.
     * @returns A promise that will be resolved when the navigation event has completed.
     */
    back() {
        return this.chromeWebDriver.navigate().back();
    }
    /**
     * Schedules a command to move forwards in the chrome browser history.
     * @returns A promise that will be resolved when the navigation event has completed.
     */
    forward() {
        return this.chromeWebDriver.navigate().forward();
    }
    /**
     * Schedules a command to refresh the current page.
     * @returns A promise that will be resolved when the navigation event has completed.
     */
    refresh() {
        return this.chromeWebDriver.navigate().refresh();
    }
    /**
     * Schedules a command to wait for a condition to hold for a single web element.
     * @param condition A condition that will repeatedly be evaluated until it returns a truthy value.
     * It is defined as a promise, condition object, or a function to evaluate as a condition.
     * @param timeout How long to wait for the condition to be true
     * @returns A promise that will be fulfilled with the first truthy value returned by the condition function, or rejected if the condition times out.
     */
    waitForElement(condition, timeout) {
        return this.chromeWebDriver.wait(condition, timeout);
    }
    /**
     * Schedules a command to wait for a condition to hold for a multiple web elements.
     * @param condition A condition that will repeatedly be evaluated until it returns a truthy value.
     * It is defined as a promise, condition object, or a function to evaluate as a condition.
     * @param timeout How long to wait for the condition to be true
     * @returns A promise that will be fulfilled with the first truthy value returned by the condition function, or rejected if the condition times out.
     */
    waitForElements(condition, timeout) {
        return this.chromeWebDriver.wait(condition, timeout);
    }
    /**
     * Schedules a command to quit the current session. After calling quit,
     * this instance will be invalidated and may no longer be used to issue commands against the browser.
     * @return A promise that will be resolved when the command has completed.
     */
    quit() {
        return this.chromeWebDriver.quit();
    }
    /**
     * Schedules a command to quit the current session after a number of milliseconds. After calling quit,
     * this instance will be invalidated and may no longer be used to issue commands against the browser.
     * @param     {number}    ms  the timeout in ms.
     * @return                    A promise that will be resolved when the command has completed.
     */
    quitAfter(ms) {
        setTimeout(async () => {
            await this.chromeWebDriver.quit();
        }, ms);
    }
}
exports.WebDriverObject = WebDriverObject;
WebDriverObject.defaultWebDriverOptions = {
    userProfile: "Default",
    userdataDir: path.join(__dirname, "./../userdata"),
    downloadDir: path.join(__dirname, "./../../resources/download/"),
    uploadDir: path.join(__dirname, "./../../resources/upload/"),
    screenshotsDir: path.join(__dirname, "./../../resources/screens/"),
    pageSourcesDir: path.join(__dirname, "./../../resources/sources/"),
    isHeadless: false,
};
//# sourceMappingURL=WebDriverObject.js.map