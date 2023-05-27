import { By, WebElement, until } from "selenium4";
import { WebDriverObject } from "./WebDriverObject";

export interface WebLocator {
  IDLocator?: string;
  CSSLocator: string;
  CSSLocator2: string;
  CSSLocator3?: string;
  XPath: string;
}

/**
 * It creates WebElement objects to control specific web elements - the most basic subdivision of a website.
 */
export class WebElementObject {
  // Static fields for the class
  private static defaultWaitTime: number = 200;
  public static NullWebLocator: WebLocator = {
    IDLocator: "",
    CSSLocator: "",
    CSSLocator2: "",
    CSSLocator3: "",
    XPath: "",
  };

  // Main states of the web element object
  private webLocator: WebLocator;
  private webDriver: WebDriverObject;

  /* States of an web element:
   * (WebElement) - there is a defined web element on the webpage.
   * (undefined) - there was no check done yet to test if there is such a web element.
   * (null) - there is no defined web element on the webpage, throw error.
   */
  protected webElement: WebElement | undefined;

  constructor(webDriver: WebDriverObject, webLocator: WebLocator) {
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
  private async findWebElement(timeout: number) {
    let webElements: WebElement[] = [];

    if (this.webLocator.IDLocator) {
      try {
        webElements = await this.webDriver.waitForElements(
          until.elementsLocated(By.id(this.webLocator.IDLocator)),
          timeout
        );

        if (webElements.length > 0) {
          this.webElement = webElements[0];
          return webElements[0];
        }
      } catch (error) {}
    }

    try {
      webElements = await this.webDriver.waitForElements(
        until.elementsLocated(By.css(this.webLocator.CSSLocator)),
        timeout
      );
      if (webElements.length > 0) {
        this.webElement = webElements[0];
        return webElements[0];
      }
    } catch (error) {}

    try {
      webElements = await this.webDriver.waitForElements(
        until.elementsLocated(By.css(this.webLocator.CSSLocator2)),
        timeout
      );
      if (webElements.length > 0) {
        this.webElement = webElements[0];
        return webElements[0];
      }
    } catch (error) {}

    if (this.webLocator.CSSLocator3) {
      try {
        webElements = await this.webDriver.waitForElements(
          until.elementsLocated(By.css(this.webLocator.CSSLocator3)),
          timeout
        );
        if (webElements.length > 0) {
          this.webElement = webElements[0];
          return webElements[0];
        }
      } catch (error) {}
    }

    try {
      webElements = await this.webDriver.waitForElements(
        until.elementsLocated(By.xpath(this.webLocator.XPath)),
        timeout
      );
      if (webElements.length > 0) {
        this.webElement = webElements[0];
        return webElements[0];
      }
    } catch (error) {
      throw new Error(
        "There is no such web element with this web locator on the current webpage."
      );
    }
  }

  public async click(timeout: number = WebElementObject.defaultWaitTime) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .click();
    }
  }

  public async clickByLinkText(
    linkText: string,
    timeout: number = WebElementObject.defaultWaitTime
  ) {
    const webElements = await this.webDriver.waitForElements(
      until.elementsLocated(By.linkText(linkText)),
      timeout
    );
    if (webElements.length > 0) {
      return await webElements[0].click();
    }
  }

  public async getText(timeout: number = WebElementObject.defaultWaitTime) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .getText();
    }
  }
  public async clear(timeout: number = WebElementObject.defaultWaitTime) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .clear();
    }
  }
  public async clearAndSendKeys(
    str: string,
    timeout: number = WebElementObject.defaultWaitTime
  ) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .clear();
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .sendKeys(str);
    }
  }
  public async sendKeys(
    str: string,
    timeout: number = WebElementObject.defaultWaitTime
  ) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .sendKeys(str);
    }
  }
  public async submit(timeout: number = WebElementObject.defaultWaitTime) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .submit();
    }
  }
  public async isDisplayed(timeout: number = WebElementObject.defaultWaitTime) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .isDisplayed();
    }
  }
  public async isEnabled(timeout: number = WebElementObject.defaultWaitTime) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .isEnabled();
    }
  }
  public async isSelected(timeout: number = WebElementObject.defaultWaitTime) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .isSelected();
    }
  }
  public async takeScreenshot(
    timeout: number = WebElementObject.defaultWaitTime
  ) {
    let webElement = this.webElement;
    if (!webElement) webElement = await this.findWebElement(timeout);
    if (webElement) {
      return await this.webDriver
        .waitForElement(until.elementIsVisible(webElement), timeout)
        .takeScreenshot();
    }
  }
}
