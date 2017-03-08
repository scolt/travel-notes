import {config} from "../wdio.conf";
export default {

    navigateTo(url) {
        return browser.url(url);
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