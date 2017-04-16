import {LoginPage} from "../pageObjects/loginPage";
import {MainPage} from "../pageObjects/mainPage";
import {MasterPage} from "../pageObjects/masterPage";
import {RegistrationPage} from "../pageObjects/registrationPage";
import {PopUp} from "../pageObjects/common/alertPopUp";
import {consts} from "../consts";
import steps from "../steps/actionSteps";
import validationSteps from '../steps/validationSteps';

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
        validationSteps.isElementVisible(login.welcomeText);
        validationSteps.isTextEqual(login.welcomeText, "Welcome Back");
        validationSteps.isElementVisible(login.emailField);
        validationSteps.isElementVisible(login.passwordField);
        validationSteps.isElementVisible(login.loginButton);
        validationSteps.isElementVisible(login.signUpButton);
    });

    it('Should allow access with valid credentials', () => {
        login.login(consts.username, consts.password);
        steps.waitForPageisLoaded(main.url);
    });

    it('Should deny access with wrong credentials', () => {
        login.login(consts.username, "abc");
        browser.waitForExist(master.alertPopUp);
        validationSteps.isElementVisible(master.alertPopUp);
        validationSteps.isTextEqual(popup.text, consts.nonValidCredentialsMessage);
    });

    it('Clicking Sign up button should open Register Page', () => {
        browser.click(login.signUpButton);
        steps.waitForPageisLoaded(register.url);
    });
});
