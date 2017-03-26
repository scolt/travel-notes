export class MainPage {

    //Elements
    addNoteButton = ".add";
    notes = "a[class='note-grid-item']";
    sorting = "div.filter-item";
    titleSortingOption = "#orderByTitle";
    userSortingOption = "#orderByUsername";
    dateSortingOption = "#orderByDate";
    toggle = "#onlyMyButton";
    url = "/main";

    //Methods

    getNote(index) {
        return `${this.notes}:nth-child(${index+1})`;
    }

    getNotes() {
        return browser.elements(this.notes);
    }

    openNote(index) {
        browser.waitForExist(this.getNote(index-1));
        browser.elementIdClick(this.getNotes().value[index-1].ELEMENT);
    }
}
