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
        browser.waitForText(element, config.waitforTimeout);
        return browser.getText(element);
    },

    uploadImage(element) {
        browser.setValue(element, 'tests/e2e/testImages/test.png');
        console.log(element.getValue())
    }
}