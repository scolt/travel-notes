import {LoginPage} from "../pageObjects/loginPage";
import {MainPage} from "../pageObjects/mainPage";
import {MasterPage} from "../pageObjects/masterPage";
import {RegistrationPage} from "../pageObjects/registrationPage";
import {PopUp} from "../pageObjects/common/alertPopUp";
import {expect} from 'chai';
import {consts} from "../consts";
import steps from "../steps/actionSteps"

describe('Login Page', () => {
    const login = new LoginPage();
    const main = new MainPage();
    const master = new MasterPage();
    const popup = new PopUp();
    const register = new RegistrationPage();

    beforeEach(() => {
            steps.navigateTo(login.url);
        });

    it('Should contain all needed values', () => {
        expect(browser.isVisible(login.welcomeText), "Welcome text is presented").to.be.true;
        expect(steps.getElementsText(login.welcomeText)).to.equal("Welcome Back");
        expect(browser.isVisible(login.emailField), "Email field is presented").to.be.true;
        expect(browser.isVisible(login.passwordField), "Password field is presented").to.be.true;
        expect(browser.isVisible(login.loginButton), "Login button is presented").to.be.true;
        expect(browser.isVisible(login.signUpButton), "Sign Up button is presented").to.be.true;
    });

    it('Should allow access with valid credentials', () => {
        login.login(consts.username, consts.password);
        steps.waitForPageisLoaded(main.url);
        expect(browser.getUrl()).to.contain('main');
    });

    it('Should deny access with wrong credentials', () => {
        login.login(consts.username, "abc");
        browser.waitForExist(master.alertPopUp);
        expect(browser.isVisible(master.alertPopUp), "Alert Popup is presented").to.be.true;
        expect(steps.getElementsText(popup.text)).to.equal(consts.nonValidCredentialsMessage);
    });

    it('Clicking Sign up button should open Register Page', () => {
        browser.click(login.signUpButton);
        steps.waitForPageisLoaded(register.url);
        expect(browser.getUrl()).to.contain('register');
    });
});
