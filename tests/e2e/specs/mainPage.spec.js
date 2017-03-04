import {MasterPage} from "../pageObjects/masterPage";
import {MainPage} from "../pageObjects/mainPage";
import {LoginPage} from "../pageObjects/loginPage";
import {expect} from 'chai';
import {consts} from '../consts';

describe('Accessing Main Page', () => {
    const master = new MasterPage();
    const main = new MainPage();
    const login = new LoginPage();

    describe('When I check elements on the Main Page for Unauthorized user', () => {

        before(() => {
            main.navigateTo();
        });
        it('Header should be visible', () => {
            expect(browser.isVisible(master.toolbar)).to.be.true;
        });
        it('Footer should be visible', () => {
            expect(browser.isVisible(master.footer)).to.be.true;
        });
        it('Add a note button should be visible', () => {
            expect(browser.isVisible(main.addNoteButton)).to.be.true;
        });
        it('List of notes should be visible', () => {
            expect(browser.isVisible(main.getNote(1))).to.be.true;
        });
        it('Sorting Button should be visible', () => {
            expect(browser.isVisible(main.sorting)).to.be.true;
        });
        it('Toogle for All/Only my notes should not be visible', () => {
            expect(browser.isExisting(main.toggle)).to.be.false;
        });
    });

    describe('When I check elements on the Main Page for Authorized user', () => {

        before(() => {
            login.navigateTo();
        });
        it('Toogle for All/Only my notes should be visible', () => {
            login.login("test@test.ru", "password");
            main.waitForPageisLoaded();
            expect(browser.isExisting(main.toggle)).to.be.true;
        });
    });

     describe('When I expand filter', () => {

        before(() => {
            main.navigateTo();
        });
        it('All needed elements should be visible', () => {
           browser.click(main.sorting);
           browser.waitForVisible(main.userSortingOption, consts.timeoutForAnimation);
           expect(browser.isExisting(main.titleSortingOption)).to.be.true;
           expect(browser.isExisting(main.dateSortingOption)).to.be.true;
           expect(browser.isExisting(main.userSortingOption)).to.be.true;
        });
    });
});
