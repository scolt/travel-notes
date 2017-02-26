import {config} from "../../wdio.conf";
export class PopUp {

    //Elements
    text = "p[style='display: block;']";


    getAlertText() {
        browser.waitForText(this.text, config.waitforTimeout);
        return browser.getText(this.text);
    }
}
