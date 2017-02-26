export class PopUp {

    //Elements
    text = "p[style='display: block;']";


    getAlertText() {
        browser.waitForText(this.text, 5000);
        return browser.getText(this.text);
    }
}
