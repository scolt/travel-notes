import {config} from "../wdio.conf";
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
