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

        it('Header should be visible', () => {
            expect(browser.isVisible(master.toolbar)).to.be.true;
        });

        it('Footer should be visible', () => {
            expect(browser.isVisible(master.footer)).to.be.true;
        });

        it('Add a note button should not be visible for non authorized users', () => {
            expect(browser.isVisible(main.addNoteButton)).to.be.false;
        });

        it('List of notes should be visible', () => {
            expect(browser.isVisible(main.getNote(1))).to.be.true;
        });

        it('Sorting Button should be visible', () => {
            expect(browser.isExisting(main.sorting)).to.be.true;
        });

        it('Toogle for All/Only my notes should not be visible for Non Authorized users', () => {
            expect(browser.isExisting(main.toggle)).to.be.false;
        });

        it('Toogle for All/Only my notes should be visible for Authorized users', () => {
            login.login(consts.username, consts.password);
            steps.waitForPageisLoaded(main.url);
            expect(browser.isExisting(main.toggle)).to.be.true;
        });

        it('Filter should contain needed values', () => {
           browser.click(main.sorting);
           browser.waitForVisible(main.userSortingOption, consts.timeoutForAnimation);
           expect(browser.isExisting(main.titleSortingOption)).to.be.true;
           expect(browser.isExisting(main.dateSortingOption)).to.be.true;
           expect(browser.isExisting(main.userSortingOption)).to.be.true;
        });
});
