export class MainPage {

    //Elements
    addNoteButton = "a.add";
    notes = "a[class='note-grid-item']";
    sorting = "#onlyMyButton";
    titleSortingOption = "#orderByTitle";
    userSortingOption = "#orderByUsername";
    dateSortingOption = "#orderByDate";
    toggle = "input[type='checkbox']";
    url = "/main";

    //Methods

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
