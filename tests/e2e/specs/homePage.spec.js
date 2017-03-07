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
        
        it('Should contain Header', () => {
            expect(browser.isVisible(master.toolbar)).to.be.true;
        });
        
        it('Should contain Footer', () => {
            expect(browser.isVisible(master.footer)).to.be.true;
        });
        
        it('Should contain Get Started button', () => {
            expect(browser.isVisible(home.getStartedButton)).to.be.true;
        });
});