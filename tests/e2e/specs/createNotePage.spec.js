import {CreateNotePage} from '../pageObjects/createNotePage.js';
import {LoginPage} from '../pageObjects/loginPage';
import {MainPage} from '../pageObjects/mainPage';
import {consts} from "../consts";
import steps from '../steps/actionSteps'
import validationSteps from '../steps/validationSteps'

describe('Create Note Page: ', () =>  {
    const createNote = new CreateNotePage();
    const login = new LoginPage();
    const main = new MainPage();

    describe('Create a Note as a non-logged in user', () =>  {

            it('Should display loggin page for Non Logged in users', () => {
                steps.navigateTo(createNote.url);
                steps.waitForPageisLoaded(login.url);
                steps.enterText(login.emailField, consts.username);
                steps.enterText(login.passwordField, consts.password);
                browser.click(login.loginButton);
                steps.waitForPageisLoaded(createNote.url);
            });
    });

    describe('Create a Note as a logged in user', () =>  {

        before(() => {
                login.login(consts.username, consts.password);
                browser.waitForVisible(main.addNoteButton);
                browser.click(main.addNoteButton)
            });
            
            it('Should contain all needed fields', () => {
                validationSteps.isElementVisible(createNote.stepper);
                validationSteps.isElementVisible(createNote.title);
                validationSteps.isElementVisible(createNote.subtitle);
                validationSteps.isElementVisible(createNote.nextButton);
            });

            it('Next Button should be disabled when Title is empty', () => {
                validationSteps.isAttributeEqual(createNote.nextButton, 'tabIndex', '-1');
            });

            it('Next Button should be enabled when Title is filled', () => {
                steps.enterText(createNote.title, "test");
                validationSteps.isAttributeEqual(createNote.nextButton, 'tabIndex', '0');
            });

            it('2nd step should be available', () => {
                steps.enterText(createNote.subtitle, "test");
                browser.click(createNote.nextButton);
                validationSteps.isElementVisible(createNote.content);
                validationSteps.isElementVisible(createNote.backButton);
            });

            it('3d step should be available', () => {
                steps.enterText(createNote.content, "test description");
                browser.click(createNote.nextButton);
                browser.waitForVisible(createNote.map);
            });

            it('4th step should be available', () => {
                browser.click(createNote.map);
                browser.click(createNote.nextButton);
                browser.waitForExist(createNote.dropZone);
            });

            it('Finish button should be active', () => {
                steps.uploadImage(createNote.dropZone);
                validationSteps.isAttributeEqual(createNote.finishButton, 'tabIndex', '0');
            });
    });
});