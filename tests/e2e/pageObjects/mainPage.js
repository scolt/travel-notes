export class MainPage {

    //Elements
    addNoteButton = ".note-grid-item.add";
    notes = ".note-grid-item:not(.add)";
    sorting = "div.filter-item";
    titleSortingOption = "#orderByTitle";
    userSortingOption = "#orderByUsername";
    dateSortingOption = "#orderByDate";
    toggle = "#onlyMyButton";
    url = "/main";
    noResultsControl = ".no-results";

    //Methods
    getNote(index) {
        return `${this.notes}[data-index='note-index-${index-1}']`;
    }

    getNotes() {
        return browser.elements(this.notes);
    }

    openNote(index) {
        browser.waitForExist(this.getNote(index));
        browser.elementIdClick(this.getNotes().value[index-1].ELEMENT);
    }
}
