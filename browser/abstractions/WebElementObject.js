"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebElementObject = void 0;
const selenium4_1 = require("selenium4");
/**
 * It creates WebElement objects to control specific web elements - the most basic subdivision of a website.
 */
class WebElementObject {
    constructor(webDriver, webLocator) {
        this.webDriver = webDriver;
        this.webLocator = webLocator;
    }
    /**
     * Schedule a command to search for the web element defined by its web locator on the current webpage.
     * @param timeout How long to wait to find the element for each locator in ms.
     * The total wait time is the number of locators checked multiplied by the timeout number in ms.
     * @returns  A promise that will resolve to an WebElement if found or
     * throws error if such element does not exist.
     */
    async findWebElement(timeout) {
        let webElements = [];
        if (this.webLocator.IDLocator) {
            try {
                webElements = await this.webDriver.waitForElements(selenium4_1.until.elementsLocated(selenium4_1.By.id(this.webLocator.IDLocator)), timeout);
                if (webElements.length > 0) {
                    this.webElement = webElements[0];
                    return webElements[0];
                }
            }
            catch (error) { }
        }
        try {
            webElements = await this.webDriver.waitForElements(selenium4_1.until.elementsLocated(selenium4_1.By.css(this.webLocator.CSSLocator)), timeout);
            if (webElements.length > 0) {
                this.webElement = webElements[0];
                return webElements[0];
            }
        }
        catch (error) { }
        try {
            webElements = await this.webDriver.waitForElements(selenium4_1.until.elementsLocated(selenium4_1.By.css(this.webLocator.CSSLocator2)), timeout);
            if (webElements.length > 0) {
                this.webElement = webElements[0];
                return webElements[0];
            }
        }
        catch (error) { }
        if (this.webLocator.CSSLocator3) {
            try {
                webElements = await this.webDriver.waitForElements(selenium4_1.until.elementsLocated(selenium4_1.By.css(this.webLocator.CSSLocator3)), timeout);
                if (webElements.length > 0) {
                    this.webElement = webElements[0];
                    return webElements[0];
                }
            }
            catch (error) { }
        }
        try {
            webElements = await this.webDriver.waitForElements(selenium4_1.until.elementsLocated(selenium4_1.By.xpath(this.webLocator.XPath)), timeout);
            if (webElements.length > 0) {
                this.webElement = webElements[0];
                return webElements[0];
            }
        }
        catch (error) {
            throw new Error("There is no such web element with this web locator on the current webpage.");
        }
    }
    async click(timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .click();
        }
    }
    async clickByLinkText(linkText, timeout = WebElementObject.defaultWaitTime) {
        const webElements = await this.webDriver.waitForElements(selenium4_1.until.elementsLocated(selenium4_1.By.linkText(linkText)), timeout);
        if (webElements.length > 0) {
            return await webElements[0].click();
        }
    }
    async getText(timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .getText();
        }
    }
    async clear(timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .clear();
        }
    }
    async clearAndSendKeys(str, timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .clear();
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .sendKeys(str);
        }
    }
    async sendKeys(str, timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .sendKeys(str);
        }
    }
    async submit(timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .submit();
        }
    }
    async isDisplayed(timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .isDisplayed();
        }
    }
    async isEnabled(timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .isEnabled();
        }
    }
    async isSelected(timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .isSelected();
        }
    }
    async takeScreenshot(timeout = WebElementObject.defaultWaitTime) {
        let webElement = this.webElement;
        if (!webElement)
            webElement = await this.findWebElement(timeout);
        if (webElement) {
            return await this.webDriver
                .waitForElement(selenium4_1.until.elementIsVisible(webElement), timeout)
                .takeScreenshot();
        }
    }
}
exports.WebElementObject = WebElementObject;
// Static fields for the class
WebElementObject.defaultWaitTime = 200;
WebElementObject.NullWebLocator = {
    IDLocator: "",
    CSSLocator: "",
    CSSLocator2: "",
    CSSLocator3: "",
    XPath: "",
};
//# sourceMappingURL=WebElementObject.js.map