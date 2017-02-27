import {MasterPage} from "../pageObjects/masterPage";
import {MainPage} from "../pageObjects/mainPage";
import {expect} from 'chai';

describe('Accessing Main Page', function() {
    const master = new MasterPage();
    const main = new MainPage();

    describe('When I check elements on the Main Page', function() {

        before(() => {
            main.navigateTo();
        });
        it('Header should be visible', function () {
            browser.isVisible(master.toolbar)
        });
        it('Foolter should be visible', function () {
            browser.isVisible(master.footer);
        });
        it('Add a note button should be visible', function () {
            browser.isVisible(main.addNoteButton);
        });

        it('user option should be visible', function () {
            browser.click(main.sorting);
            browser.isVisible(main.userSortingOption);
        });
    });
});
