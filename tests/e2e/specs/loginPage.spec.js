import {LoginPage} from "../pageObjects/loginPage";
import {MainPage} from "../pageObjects/mainPage";
import {MasterPage} from "../pageObjects/masterPage";
import {PopUp} from "../pageObjects/common/alertPopUp";
import {expect} from 'chai';
import {consts} from "../consts";
import steps from "../steps/actionSteps"

describe('Login Page', () => {
    const login = new LoginPage();
    const main = new MainPage();
    const master = new MasterPage();
    const popup = new PopUp();

    before(() => {
            steps.navigateTo(login.url);
        });

    it('Should contain Welcome Text', () => {
        expect(browser.isVisible(login.welcomeText)).to.be.true;
        expect(steps.getElementsText(login.welcomeText)).to.equal("Welcome Back");
    });

    it('Should contain Email Field', () => {
        expect(browser.isVisible(login.emailField)).to.be.true;
    });

    it('Should contain Password Field', () => {
        expect(browser.isVisible(login.passwordField)).to.be.true;
    });

    it('Should contain Login Buttom', () => {
        expect(browser.isVisible(login.loginButton)).to.be.true;
    });

    it('Should contain Sign Up Button', () => {
        expect(browser.isVisible(login.signUpButton)).to.be.true;
    });

    it('Should allow access with valid credentials', () => {
        login.login(consts.username, consts.password);
        steps.waitForPageisLoaded(main.url);
        expect(browser.getUrl()).to.contain('main');
    });

    it('Should deny access with wrong credentials', () => {
        login.login(consts.username, "abc");
        browser.waitForVisible(master.alertPopUp, consts.timeoutForAnimation);
        expect(browser.isVisible(master.alertPopUp)).to.be.true;
        expect(popup.getAlertText()).to.equal(consts.nonValidCredentialsMessage);
    });
});
