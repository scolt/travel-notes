import {Toolbar} from "../pageObjects/common/toolbar";
import {HomePage} from '../pageObjects/homePage.js';
import {LoginPage} from '../pageObjects/loginPage';
import {MainPage} from "../pageObjects/mainPage";
import {consts} from '../consts';
import {expect} from 'chai';
import steps from '../steps/actionSteps'
 
 
 describe('Global Toolbar', () => {

    const home = new HomePage();
    const toolbar = new Toolbar();
    const login = new LoginPage();
    const main = new MainPage();

        before(() => {
            steps.navigateTo(home.url);
        });
        
        it('Should contain all menu button', () => {
            expect(browser.isVisible(toolbar.menuButton)).to.be.true;
        });
        
        it('Should contain login button for non Authorized users', () => {
            expect(browser.isVisible(toolbar.logInButton)).to.be.true;    
        });
        
        it('Should contain Sign In button for Non Authorized users', () => {
            expect(browser.isVisible(toolbar.signUpButton)).to.be.true;
        });

        it('Should not contain Sign In and Login buttons for Authorized users', () => {
            login.login(consts.username, consts.password);
            steps.waitForPageisLoaded(main.url);
            expect(browser.isVisible(toolbar.logInButton)).to.be.false;
            expect(browser.isVisible(toolbar.signUpButton)).to.be.false;
        });
});