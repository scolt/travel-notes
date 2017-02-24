import {HomePage} from '../pageObjects/homePage.js';
import {MasterPage} from "../pageObjects/masterPage";
import {Toolbar} from "../pageObjects/common/toolbar";
import {expect} from 'chai';

describe('Accessing Home Page', function() {
    const home = new HomePage();
    const master = new MasterPage();
    const toolbar = new Toolbar();

    describe('When I visit Home Page', function() {

        before(() => {
            home.navigateTo();
        });
        it('Global Toolbar should be visible', function () {
            browser.isVisible(master.toolbar);
        });
        it('Global Footer should be visible', function () {
            browser.isVisible(master.footer);
        });
        it('Get Started Button should be visible', function () {
            browser.isVisible(home.getStartedButton);
        });
    });

    describe('When I observe Global Toolbar', function() {

        before(() => {
            home.navigateTo();
        });
        it('Menu button should be visible', function () {
            browser.isVisible(toolbar.menuButton);
        });
        it('Log In button', function () {
            browser.isVisible(toolbar.logInButton);
        });
        it('Sign Up button should be visible', function () {
            browser.isVisible(toolbar.signUpButton);
        });
    });
});
