import {MasterPage} from "../pageObjects/masterPage";
import {MainPage} from "../pageObjects/mainPage";
import {LoginPage} from "../pageObjects/loginPage";
import {expect} from 'chai';

describe('Accessing Main Page', function() {
    const master = new MasterPage();
    const main = new MainPage();
    const login = new LoginPage();

    describe('When I check elements on the Main Page for Unauthorized user', function() {

        before(() => {
            main.navigateTo();
        });
        it('Header should be visible', function () {
            browser.isVisible(master.toolbar)
        });
        it('Footer should be visible', function () {
            browser.isVisible(master.footer);
        });
        it('Add a note button should be visible', function () {
            browser.isVisible(main.addNoteButton);
        });
        it('List of notes should be visible', function () {
            browser.isVisible(main.notes)
        });
        it('Sorting Button should be visible', function () {
            browser.isVisible(main.sorting)
        });
    });

    describe('When I check elements on the Main Page for Authorized user', function() {

        before(() => {
            login.navigateTo();
        });
        it('Toogle for All/Only my notes should be visible', function () {
            login.login("test@test.ru", "password");
            browser.isVisible(main.toggle);
        });
    });
});
