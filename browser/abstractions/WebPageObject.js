"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPageObject = void 0;
/**
 * It creates Page objects to control specific pages of a website.
 */
class WebPageObject {
    /**
     * It creates Page Objects that will contain the general representation of a website's page with all their page components.
     */
    constructor(url, webDriver) {
        this.url = url;
        this.webDriver = webDriver;
    }
}
exports.WebPageObject = WebPageObject;
//# sourceMappingURL=WebPageObject.js.map