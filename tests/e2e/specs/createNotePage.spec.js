import {CreateNotePage} from '../pageObjects/createNotePage.js';
import {expect} from 'chai';
import steps from '../steps/actionSteps'

describe('Create Note Page', () =>  {
    const createNote = new CreateNotePage();
    
    beforeEach(() => {
            steps.navigateTo(createNote.url);
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
            steps.enterText(createNote.title, "test");
            steps.enterText(createNote.subtitle, "test");
            browser.click(createNote.nextButton);
            browser.waitForExist(createNote.content);
        });
});