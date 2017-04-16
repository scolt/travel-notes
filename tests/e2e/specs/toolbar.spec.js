import {Toolbar} from "../pageObjects/common/toolbar";
import {HomePage} from '../pageObjects/homePage.js';
import {LoginPage} from '../pageObjects/loginPage';
import {RegistrationPage} from '../pageObjects/registrationPage';
import {MainPage} from "../pageObjects/mainPage";
import {consts} from '../consts';
import steps from '../steps/actionSteps';
import validationSteps from '../steps/validationSteps'
 
 
 describe('Global Toolbar', () => {

    const home = new HomePage();
    const toolbar = new Toolbar();
    const login = new LoginPage();
    const main = new MainPage();
    const register = new RegistrationPage();

        before(() => {
            steps.navigateTo(home.url);
        });
        
        it('Should contain all needed links', () => {
            validationSteps.isElementVisible(toolbar.menuButton);
            validationSteps.isElementVisible(toolbar.logInButton);
            validationSteps.isElementVisible(toolbar.signUpButton);
            validationSteps.isElementVisible(toolbar.logo);
        });

        it('Clicking Log In button should open Login page', () => {
            browser.click(toolbar.logInButton);
            steps.waitForPageisLoaded(login.url);
        });

        it('Clicking Sign Up button should open Registration page', () => {
            browser.click(toolbar.signUpButton);
            steps.waitForPageisLoaded(register.url);
        });

        it('Should not contain Sign In and Login buttons for Authorized users', () => {
            login.login(consts.username, consts.password);
            steps.waitForPageisLoaded(main.url);
            validationSteps.isElementNotVisible(toolbar.logInButton);
            validationSteps.isElementNotVisible(toolbar.signUpButton);
        });
});