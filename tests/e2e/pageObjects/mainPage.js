import {config} from "../wdio.conf";
export class MainPage {

    //Elements
    addNoteButton = "a.add";
    notes = "a[class='note-grid-item']";
    sorting = "svg[data-reactid='.0.1.0.1.0.0.2.0.1:1']";
    titleSortingOption = "span#orderByTitle";
    userSortingOption = "span#orderByUsername";
    dateSortingOption = "span#orderByDate";
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

    getNote(index) {
        return `${this.notes}:nth-child(${index+1})`;
    }

    getNotes() {
        return browser.elements(this.notes);
    }

    openNote(index) {
        browser.elementIdClick(this.getNotes().value[index-1].ELEMENT);
    }
}
