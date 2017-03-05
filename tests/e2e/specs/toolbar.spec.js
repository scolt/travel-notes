import {Toolbar} from "../pageObjects/common/toolbar";
import {HomePage} from '../pageObjects/homePage.js';
import {expect} from 'chai';
import steps from '../steps/actionSteps'
 
 
 describe('Global Toolbar', () => {

    const home = new HomePage();
    const toolbar = new Toolbar();

        before(() => {
            steps.navigateTo(home.url);
        });
        
        it('Should contain all menu button', () => {
            expect(browser.isVisible(toolbar.menuButton)).to.be.true;
        });
        
        it('Should contain login button', () => {
            expect(browser.isVisible(toolbar.logInButton)).to.be.true;    
        });
        
        it('Should contain Sign In button', () => {
            expect(browser.isVisible(toolbar.signUpButton)).to.be.true;
        });
});