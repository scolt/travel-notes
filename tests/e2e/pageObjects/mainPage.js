import {config} from "../wdio.conf";
export class MainPage {

    //Elements
    addNoteButton = "a.add";
    notes = "a.note-grid-item";
    sorting = "svg[data-reactid='.0.1.0.1.0.0.2.0.1:1']";
    titleSortingOption = "";
    userSortingOption = "div[data-reactid='.f.0.0.$2/=1$2']";
    dateSortingOption = "";

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
