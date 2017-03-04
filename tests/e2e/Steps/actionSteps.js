import {config} from "../wdio.conf";
export class Steps {

    navigateTo(url) {
        return browser.url(url);
    }

    waitForPageisLoaded(url) {
        browser.waitUntil(() => {
            return browser.getUrl() === (config.baseUrl + url)
        }, config.waitforTimeout);
    }
}