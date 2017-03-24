import {NotePage} from '../pageObjects/notePage';
import {MainPage} from '../pageObjects/mainPage';
import {LoginPage} from "../pageObjects/loginPage";
import {expect} from 'chai';
import {consts} from "../consts";
import steps from "../steps/actionSteps"

describe('Note Page', () => {
    const note = new NotePage();
    const main = new MainPage();
    const login = new LoginPage();
    
        before(() => {
            steps.navigateTo(main.url);
           });

        it('All needed controls should be displayed', () => {
            browser.waitForExist(main.getNote(1));
            main.openNote(1);
            browser.waitForExist(note.map);
            expect(browser.isVisible(note.gallery), "Gallery is presented").to.be.true;
            expect(browser.isVisible(note.signature), "signature is presented").to.be.true;
        });
}); 
