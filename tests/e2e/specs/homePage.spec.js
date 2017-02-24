import {HomePage} from '../pageObjects/homePage.js';
import {expect} from 'chai';

describe('I was there first test', function() {
    const home = new HomePage();

    before(() => {
        browser.url("/");
    });

    it('Click register button', function() {

        browser.click(home.getStartedButton);

    });

});
