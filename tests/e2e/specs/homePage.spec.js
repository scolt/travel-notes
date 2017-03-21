import {HomePage} from '../pageObjects/homePage.js';
import {MasterPage} from "../pageObjects/masterPage";
import {Toolbar} from "../pageObjects/common/toolbar";
import {expect} from 'chai';
import steps from '../steps/actionSteps'

describe('Home Page', () =>  {
    const home = new HomePage();
    const master = new MasterPage();
    const toolbar = new Toolbar();
    
    before(() => {
            steps.navigateTo(home.url);
        });
        
        it('Should contain all needed fields', () => {
            expect(browser.isVisible(master.toolbar), "Header is presented").to.be.true;
            expect(browser.isVisible(master.footer), "Footer is presented").to.be.true;
            expect(browser.isVisible(home.getStartedButton), "Get started button is presented").to.be.true;
        });
});