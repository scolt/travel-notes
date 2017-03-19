import {RegistrationPage} from '../pageObjects/registrationPage';
import {LoginPage} from '../pageObjects/loginPage';
import {expect} from 'chai';
import steps from '../steps/actionSteps'

describe('Global Toolbar', () => {

    const register = new RegistrationPage();
    const login = new LoginPage();

        before(() => {
            steps.navigateTo(register.url);
        });

        it('Should contain All needed fields', () => {
            expect(browser.isVisible(register.welcomeText), "Welcome text is presented").to.be.true;
            expect(steps.getElementsText(register.welcomeText)).to.equal("Welcome Back");
            expect(browser.isVisible(register.firstNameField), "First Name is presented").to.be.true;
            expect(browser.isVisible(register.lastNameField), "Last Name is presented").to.be.true;
            expect(browser.isVisible(register.emailField), "Email is presented").to.be.true;
            expect(browser.isVisible(register.userNameField), "User Name is presented").to.be.true;
            expect(browser.isVisible(register.passwordField), "Password is presented").to.be.true;
            expect(browser.isVisible(register.birthdayField), "Birthday is presented").to.be.true;
            expect(browser.isExisting(register.maleRadioButton), "Male Option is presented").to.be.true;
            expect(browser.isExisting(register.femaleRadioButton), "Female option is presented").to.be.true;
            expect(browser.isVisible(register.skypeField), "Skype is presented").to.be.true;
            expect(browser.isVisible(register.websiteFieled), "Web site is presented").to.be.true;
            expect(browser.isVisible(register.aboutMeField), "About Me is presented").to.be.true;
            expect(browser.isVisible(register.avatar), "Avatar is presented").to.be.true;
            expect(browser.isVisible(register.backgroundPicture), "Backround is presented").to.be.true;
            expect(browser.isVisible(register.registerButton), "Register Button is presented").to.be.true;
            expect(browser.isVisible(register.signInButton), "Sign In is presented").to.be.true;
        });

        it('Clicking Sign In button should open Login page', () => {
            browser.click(register.signInButton);
            steps.waitForPageisLoaded(login.url);
            expect(browser.getUrl()).to.contain('login');
        });      
});