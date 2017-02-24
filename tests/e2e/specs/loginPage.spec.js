import {HomePage} from '../pageObjects/homePage.js';
import {Toolbar} from "../pageObjects/common/toolbar";
import {expect} from 'chai';

describe('Accessing Login Page', function() {
    const home = new HomePage();
    const toolbar = new Toolbar();

    describe('When I visit Home Page', function() {

        before(() => {
            home.navigateTo();
        });
        it('When I click Log In button', function () {
            browser.click(toolbar.logInButton);
        });
        it('I should be on Login page', function () {
            expect(browser.getUrl()).to.contain('login');
        });
    });
});
