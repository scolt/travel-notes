import {config} from "../wdio.conf";

const config = config;

export class MainPage {

    //Elements


    //Methods
    navigateTo() {
        return browser.url('/main');
    }

    waitForPageisLoaded() {
        browser.waitUntil(function () {
            return browser.getUrl() === (config.baseUrl + "/main")
        }, 5000);
    }

}
