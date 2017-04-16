import {RegistrationPage} from '../pageObjects/registrationPage';
import {LoginPage} from '../pageObjects/loginPage';
import steps from '../steps/actionSteps';
import validationSteps from '../steps/validationSteps'

describe('Registration Page', () => {

    const register = new RegistrationPage();
    const login = new LoginPage();

        beforeEach(() => {
            steps.navigateTo(register.url);
        });

        it('Should contain All needed fields', () => {
            validationSteps.isElementVisible(register.welcomeText);
            validationSteps.isTextEqual(register.welcomeText, "Welcome Back");
            validationSteps.isElementVisible(register.firstNameField);
            validationSteps.isElementVisible(register.lastNameField);
            validationSteps.isElementVisible(register.emailField);
            validationSteps.isElementVisible(register.userNameField);
            validationSteps.isElementVisible(register.passwordField);
            validationSteps.isElementVisible(register.birthdayField);
            validationSteps.isElementExisting(register.maleRadioButton);
            validationSteps.isElementExisting(register.femaleRadioButton);
            validationSteps.isElementVisible(register.skypeField);
            validationSteps.isElementVisible(register.websiteFieled);
            validationSteps.isElementVisible(register.aboutMeField);
            validationSteps.isElementExisting(register.avatar);
            validationSteps.isElementExisting(register.backgroundPicture);
            validationSteps.isElementVisible(register.registerButton);
            validationSteps.isElementVisible(register.signInButton);
        });

        it('Clicking Sign In button should open Login page', () => {
            browser.click(register.signInButton);
            steps.waitForPageisLoaded(login.url);
        }); 

        it('Registration button should be active when all obligatory fields are filled', () => {
            steps.enterText(register.firstNameField, "test");
            steps.enterText(register.lastNameField, "test");
            steps.enterText(register.emailField, "test@test.ru");
            steps.enterText(register.userNameField, "test");
            steps.enterText(register.passwordField, "test");
            validationSteps.isAttributeEqual(register.registerButton, 'tabIndex', '0');
        }); 
});