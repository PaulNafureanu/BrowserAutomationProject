import { WebDriverObject } from "./WebDriverObject";

/**
 * It creates Component objects to control specific components of a page and or repeated components in a website.
 */
export class WebComponentObject {
  protected webDriver: WebDriverObject;

  /**
   * It creates Page Components that will contain the general behaviors of all page components.
   */
  constructor(webDriver: WebDriverObject) {
    this.webDriver = webDriver;
  }
}
