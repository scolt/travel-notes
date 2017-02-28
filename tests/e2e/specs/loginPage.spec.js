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
           browser.isVisible(login.welcomeText);
        });
        it('Welcome text Should be equal to Welcome Back', () => {
            expect(login.getWelcomeText()).to.equal("Welcome Back");
        });
        it('Email field should be visible', () => {
            browser.isVisible(login.emailField);
        });
        it('Password field should be visible', () => {
            browser.isVisible(login.passwordField);
        });
        it('Login button should be visible', () => {
            browser.isVisible(login.loginButton);
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
            browser.isVisible(master.alertPopUp);
            expect(popup.getAlertText()).to.equal("You provide wrong email or password. Please try again.");
        });
    });
});
