import {HomePage} from '../pageObjects/homePage.js';
import {Toolbar} from "../pageObjects/common/toolbar";
import {LoginPage} from "../pageObjects/loginPage";
import {MainPage} from "../pageObjects/mainPage";
import {MasterPage} from "../pageObjects/masterPage";
import {PopUp} from "../pageObjects/common/alertPopUp";
import {expect} from 'chai';

describe('Accessing Login Page', () => {
    const home = new HomePage();
    const toolbar = new Toolbar();
    const login = new LoginPage();
    const main = new MainPage();
    const master = new MasterPage();
    const popup = new PopUp();


    describe('When I click Login Button', () => {

        before(() => {
            home.navigateTo();
        });
        it('I should be on Login page', () => {
            browser.click(toolbar.logInButton);
            expect(browser.getUrl()).to.contain('login');
        });
        it('Welcome Text should be visible', () => {
           expect(browser.isVisible(login.welcomeText)).to.be.true;
        });
        it('Welcome text Should be equal to Welcome Back', () => {
            expect(login.getWelcomeText()).to.equal("Welcome Back");
        });
        it('Email field should be visible', () => {
            expect(browser.isVisible(login.emailField)).to.be.true;
        });
        it('Password field should be visible', () => {
            expect(browser.isVisible(login.passwordField)).to.be.true;
        });
        it('Login button should be visible', () => {
            expect(browser.isVisible(login.loginButton)).to.be.true;
        });
        it('Sign Up button should be visible', () => {
             expect(browser.isVisible(login.signUpButton)).to.be.true;
        });
    });

    describe('Entering Valid Credentials', () => {

        beforeEach(() => {
            login.navigateTo();
        });
        it('Should allow access with valid credentials', () => {
            login.login("test@test.ru", "password");
            main.waitForPageisLoaded();
            expect(browser.getUrl()).to.contain('main');
        });
        it('Should deny access with wrong credentials', () => {
            login.login("test@test.ru", "abc");
            browser.waitForVisible(master.alertPopUp);
            expect(browser.isVisible(master.alertPopUp)).to.be.true;
            expect(popup.getAlertText()).to.equal("You provide wrong email or password. Please try again.");
        });
    });
});
