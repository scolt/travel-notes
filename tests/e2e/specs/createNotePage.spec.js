import {CreateNotePage} from '../pageObjects/createNotePage.js';
import {LoginPage} from '../pageObjects/loginPage';
import {MainPage} from '../pageObjects/mainPage';
import {consts} from "../consts";
import {expect} from 'chai';
import steps from '../steps/actionSteps'

describe('Create Note Page', () =>  {
    const createNote = new CreateNotePage();
    const login = new LoginPage();
    const main = new MainPage();
    
    before(() => {
            login.login(consts.username, consts.password);
            browser.waitForVisible(main.addNoteButton);
            browser.click(main.addNoteButton)
        });
        
        it('Should contain all needed fields', () => {
            expect(browser.isVisible(createNote.stepper), "Stepper is presented").to.be.true;
            expect(browser.isVisible(createNote.title), "Title Field is presented").to.be.true;
            expect(browser.isVisible(createNote.subtitle), "Subtitle Field is presented").to.be.true;
            expect(browser.isVisible(createNote.nextButton), "Next Button is presented").to.be.true;
        });

        it('Next Button should be disabled when Title is empty', () => {
            expect(browser.getAttribute(createNote.nextButton, 'tabIndex'), "Next Button is disabled").to.equal('-1');
        });

        it('Next Button should be enabled when Title is filled', () => {
            steps.enterText(createNote.title, "test");
            expect(browser.getAttribute(createNote.nextButton, 'tabIndex'), "Next button is enabled").to.equal('0');
        });

        it('2nd step should be available', () => {
            steps.enterText(createNote.subtitle, "test");
            browser.click(createNote.nextButton);
            browser.waitForVisible(createNote.content);
            expect(browser.isVisible(createNote.backButton), "Back button is displayed").to.be.true;
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
            expect(browser.getAttribute(createNote.finishButton, 'tabIndex'), "Finish button is enabled").to.equal('0');
        });
});