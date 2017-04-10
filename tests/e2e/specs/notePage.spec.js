import {NotePage} from '../pageObjects/notePage';
import {MainPage} from '../pageObjects/mainPage';
import {LoginPage} from "../pageObjects/loginPage";
import {Toolbar} from "../pageObjects/common/toolbar";
import {consts} from "../consts";
import steps from "../steps/actionSteps"
import validationSteps from "../steps/validationSteps"

describe('Note Page:', () => {
    const note = new NotePage();
    const main = new MainPage();
    const login = new LoginPage();
    const toolbar = new Toolbar();
    
        beforeEach(() => {
            steps.navigateTo(main.url);
           });

        it('All needed controls should be displayed', () => {
            main.openNote(1);
            browser.waitForExist(note.map);
            validationSteps.isElementVisible(note.title);
            validationSteps.isElementVisible(note.subtitle);
            validationSteps.isElementVisible(note.text);
            validationSteps.isElementVisible(note.gallery);
            validationSteps.isElementVisible(note.signature);
        });

        it('It should be possible to close a Note', () => {
            browser.waitForVisible(main.getNote(1));
            main.openNote(1);
            browser.waitForExist(note.map);
            browser.click(note.closeButton);
            steps.waitForPageisLoaded(main.url);
        });
}); 
