import {Config} from "../wdio.conf";

const config = Config;

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
