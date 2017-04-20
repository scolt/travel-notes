import {MasterPage} from "../pageObjects/masterPage";
import {MainPage} from "../pageObjects/mainPage";
import {LoginPage} from "../pageObjects/loginPage";
import {NotePage} from "../pageObjects/notePage";
import {CreateNotePage} from "../pageObjects/createNotePage";
import {consts} from '../consts';
import steps from "../steps/actionSteps";
import validationSteps from '../steps/validationSteps';

describe('Main Page:', () => {
    const master = new MasterPage();
    const main = new MainPage();
    const login = new LoginPage();
    const note = new NotePage();
    const createNote = new CreateNotePage();

        beforeEach(() => {
            steps.navigateTo(main.url);
        });

        it('All needed controls should be displayed', () => {
            validationSteps.isElementVisible(master.toolbar);
            validationSteps.isElementVisible(master.footer);
            validationSteps.isElementNotVisible(main.addNoteButton);
            browser.waitForExist(main.getNote(1));
            validationSteps.isElementExisting(main.sorting);
            validationSteps.isElementNotExisting(main.toggle);
        });

        it('Toogle for All/Only my notes should be visible for Authorized users', () => {
            login.login(consts.username, consts.password);
            steps.waitForPageisLoaded(main.url);
            validationSteps.isElementExisting(main.toggle);
        });

        it('Filter should contain needed values', () => {
           browser.waitForVisible(main.sorting);
           browser.click(main.sorting);
           browser.waitForExist(main.userSortingOption);
           validationSteps.isElementExisting(main.titleSortingOption);
           validationSteps.isElementExisting(main.dateSortingOption);
           validationSteps.isElementExisting(main.userSortingOption);
        });     

        it('Note can be opened', () => {
           main.openNote(1);
           validationSteps.isURLContaining(note.url);
        });

        it('Create a Note page can be opened', () => {
           browser.waitForVisible(main.addNoteButton);
           browser.click(main.addNoteButton)
           steps.waitForPageisLoaded(createNote.url);
        });

        it('Toggle should filter user\'s notes', () => {
           browser.waitForVisible(main.addNoteButton);
           browser.click(main.toggle);
           browser.waitForVisible(main.noResultsControl);
        });
 });
