import {HomePage} from '../pageObjects/homePage.js';
import {Toolbar} from "../pageObjects/common/toolbar";
import {LoginPage} from "../pageObjects/loginPage";
import {MainPage} from "../pageObjects/mainPage";
import {MasterPage} from "../pageObjects/masterPage";
import {PopUp} from "../pageObjects/common/alertPopUp";
import {expect} from 'chai';

describe('Accessing Login Page', function() {
    const home = new HomePage();
    const toolbar = new Toolbar();
    const login = new LoginPage();
    const main = new MainPage();
    const master = new MasterPage();
    const popup = new PopUp();


    describe('When I click Login Button', function() {

        before(() => {
            home.navigateTo();
        });
        it('I should be on Login page', function () {
            browser.click(toolbar.logInButton);
            expect(browser.getUrl()).to.contain('login');
        });
        it('Welcome Text should be visible', function () {
           browser.isVisible(login.welcomeText);
        });
        it('Welcome text Should be equal to Welcome Back', function () {
            expect(login.getWelcomeText()).to.equal("Welcome Back");
        });
        it('Email field should be visible', function () {
            browser.isVisible(login.emailField);
        });
        it('Password field should be visible', function () {
            browser.isVisible(login.passwordField);
        });
        it('Login button should be visible', function () {
            browser.isVisible(login.loginButton);
        });
        it('Sign Up button should be visible', function () {
            browser.isVisible(login.signUpButton);
        });
    });

    describe('Entering Valid Credentials', function() {

        before(() => {
            login.navigateTo();
        });

        it('And I enter valid credentials', function () {
            login.enterEmail("test@test.ru");
            login.enterPassword("password");
            browser.click(login.loginButton);
        });
        it('And Wait until page is loaded', function () {
            main.waitForPageisLoaded();
        });
        it('I should be on Main Page', function () {
            expect(browser.getUrl()).to.contain('main');
        });
    });

    describe('Entering Non Valid Credentials', function() {

        before(() => {
            login.navigateTo();
        });

        it('And I enter non valid  credentials', function () {
            login.enterEmail("test@test.ru");
            login.enterPassword("abc");
            browser.click(login.loginButton);
        });
        it('Then Alert Pop Up Should be visible', function () {
            browser.isVisible(master.alertPopUp);
        });
        it('And Text of Popup should be visible', function () {
            expect(popup.getAlertText()).to.equal("You provide wrong email or password. Please try again.");
        });
    });
});
