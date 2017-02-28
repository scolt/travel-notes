import {config} from "../wdio.conf";
export class MainPage {

    //Elements
    addNoteButton = "a.add";
    notes = "a[class='note-grid-item']";
    sorting = "svg[data-reactid='.0.1.0.1.0.0.2.0.1:1']";
    titleSortingOption = "";
    userSortingOption = "div[data-reactid='.f.0.0.$2/=1$2']";
    dateSortingOption = "";
    toggle = "input[type='checkbox']";

    //Methods
    navigateTo() {
        return browser.url('/main');
    }

    waitForPageisLoaded() {
        browser.waitUntil(() => {
            return browser.getUrl() === (config.baseUrl + "/main")
        }, config.waitforTimeout);
    }

    getNotes() {
        return browser.elements(this.notes);
    }

    openNote(index) {
        browser.elementIdClick(this.getNotes().value[index-1].ELEMENT);
    }
}
