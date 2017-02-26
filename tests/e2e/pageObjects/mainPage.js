import {config} from "../wdio.conf";
export class MainPage {

    //Elements


    //Methods
    navigateTo() {
        return browser.url('/main');
    }

    waitForPageisLoaded() {
        browser.waitUntil(() => {
            return browser.getUrl() === (config.baseUrl + "/main")
        }, config.waitforTimeout);
    }
}
