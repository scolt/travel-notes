import {HomePage} from '../pageObjects/homePage.js';
import {MasterPage} from "../pageObjects/masterPage";
import {expect} from 'chai';

describe('When I visit Home Page', function() {
    const home = new HomePage();
    const master = new MasterPage();

    before(() => {
        browser.url("/");
    });

    it('Global Toolbar should be visible', function() {
        browser.isVisible(master.toolbar);
    });

    it('Global Footer should be visible', function() {
        browser.isVisible(master.footer);
    });

    it('Get Started Button should be visible', function() {
        browser.isVisible(home.getStartedButton);
    });

});
