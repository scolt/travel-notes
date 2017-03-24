export class CreateNotePage {

    //Elements
    url = "/note/create";
    stepper = ".stepper-bar";
    content = ".step-content > div > p:first-child";
    title = "input[name='title']";
    subtitle = "input[name='subtitle']";
    nextButton = ".step-actions button[type='button']";

    //Methods
    enterTitle(text) {
        browser.setValue(this.title, text);
    }
}