import {HomePage} from '../pageObjects/homePage.js';
import {MasterPage} from "../pageObjects/masterPage";
import {RegistrationPage} from "../pageObjects/registrationPage";
import {Toolbar} from "../pageObjects/common/toolbar";
import steps from '../steps/actionSteps';
import validationSteps from '../steps/validationSteps';

describe('Home Page', () =>  {
    const home = new HomePage();
    const master = new MasterPage();
    const toolbar = new Toolbar();
    const register = new RegistrationPage();
    
    before(() => {
            steps.navigateTo(home.url);
        });
        
        it('Should contain all needed fields', () => {
            validationSteps.isElementVisible(master.toolbar);
            validationSteps.isElementVisible(master.footer);
            validationSteps.isElementVisible(home.getStartedButton);
        });

        it('Clicking Get Started button Should open Registration page', () => {
            browser.click(home.getStartedButton);
            steps.waitForPageisLoaded(register.url);
        });        
});