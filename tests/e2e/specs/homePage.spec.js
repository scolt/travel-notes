import {HomePage} from '../pageObjects/homePage.js';
<<<<<<< HEAD
import {MasterPage} from "../pageObjects/masterPage";
import {Toolbar} from "../pageObjects/common/toolbar";
import {expect} from 'chai';

describe('Accessing Home Page', () =>  {
    const home = new HomePage();
    const master = new MasterPage();
    const toolbar = new Toolbar();

    describe('When I visit Home Page', () => {

        before(() => {
            home.navigateTo();
        });
        it('Global Toolbar should be visible', () => {
            expect(browser.isVisible(master.toolbar)).to.be.true;
        });
        it('Global Footer should be visible', () => {
            expect(browser.isVisible(master.footer)).to.be.true;
        });
        it('Get Started Button should be visible', () => {
            expect(browser.isVisible(home.getStartedButton)).to.be.true;
        });
    });

    describe('When I observe Global Toolbar', () => {

        before(() => {
            home.navigateTo();
        });
        it('Menu button should be visible', () => {
            expect(browser.isVisible(toolbar.menuButton)).to.be.true;
        });
        it('Log In button', () => {
            expect(browser.isVisible(toolbar.logInButton)).to.be.true;
        });
        it('Sign Up button should be visible', () => {
            expect(browser.isVisible(toolbar.signUpButton)).to.be.true;
        });
    });
=======
import {expect} from 'chai';

describe('I was there first test', function() {
    const home = new HomePage();

    before(() => {
        browser.url("/");
    });

    it('Click register button', function() {

        browser.click(home.getStartedButton);

    });

    it('Check', function() {

        browser.click(home.getStartedButton);

    });


>>>>>>> master
});
