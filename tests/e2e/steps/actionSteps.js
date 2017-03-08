import {config} from "../wdio.conf";
export default {

    navigateTo(url) {
        if (url) {
            return browser.url(url);
        } else {
            return browser.url(config.baseUrl);
        }
    },

    waitForPageisLoaded(url) {
        browser.waitUntil(
            () => browser.getUrl() === (config.baseUrl + url),
            config.waitforTimeout
        );
    },

    getElementsText(element) {
        return browser.getText(element);
    }
}