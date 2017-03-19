import {MasterPage} from "../pageObjects/masterPage";
import {MainPage} from "../pageObjects/mainPage";
import {LoginPage} from "../pageObjects/loginPage";
import {expect} from 'chai';
import {consts} from '../consts';
import steps from "../steps/actionSteps"

describe('Main Page', () => {
    const master = new MasterPage();
    const main = new MainPage();
    const login = new LoginPage();

        before(() => {
            steps.navigateTo(main.url);
        });

        it('All needed controls should be displayed', () => {
            expect(browser.isVisible(master.toolbar), "Header is presented").to.be.true;
            expect(browser.isVisible(master.footer), "Footer is presented").to.be.true;
            expect(browser.isVisible(main.addNoteButton), "Add a note button is not presented").to.be.false;
            browser.waitForExist(main.getNote(1));
            expect(browser.isVisible(main.getNote(1)), "Notes are presented").to.be.true;
            expect(browser.isExisting(main.sorting), "Sorting is presented").to.be.true;
            expect(browser.isExisting(main.toggle), "Toggle for My notes is not presented").to.be.false;
        });

        it('Toogle for All/Only my notes should be visible for Authorized users', () => {
            login.login(consts.username, consts.password);
            steps.waitForPageisLoaded(main.url);
            expect(browser.isExisting(main.toggle), "Toggle for my notes is presented").to.be.true;
        });

        it('Filter should contain needed values', () => {
           browser.click(main.sorting);
           browser.waitForExist(main.userSortingOption);
           expect(browser.isExisting(main.titleSortingOption), "Title sorting is presented").to.be.true;
           expect(browser.isExisting(main.dateSortingOption), "Date sorting is presented").to.be.true;
           expect(browser.isExisting(main.userSortingOption), "User sorting is presented").to.be.true;
        });
});
