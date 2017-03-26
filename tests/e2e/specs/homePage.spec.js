import {HomePage} from '../pageObjects/homePage.js';
import {MasterPage} from "../pageObjects/masterPage";
import {RegistrationPage} from "../pageObjects/registrationPage";
import {Toolbar} from "../pageObjects/common/toolbar";
import {expect} from 'chai';
import steps from '../steps/actionSteps'

describe('Home Page', () =>  {
    const home = new HomePage();
    const master = new MasterPage();
    const toolbar = new Toolbar();
    const register = new RegistrationPage();
    
    before(() => {
            steps.navigateTo(home.url);
        });
        
        it('Should contain all needed fields', () => {
            expect(browser.isVisible(master.toolbar), "Header is presented").to.be.true;
            expect(browser.isVisible(master.footer), "Footer is presented").to.be.true;
            expect(browser.isVisible(home.getStartedButton), "Get started button is presented").to.be.true;
        });

        it('Clicking Get Started button Should open Registration page', () => {
            browser.click(home.getStartedButton);
            steps.waitForPageisLoaded(register.url);
        });        
});