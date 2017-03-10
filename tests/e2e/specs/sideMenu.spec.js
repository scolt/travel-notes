import {Toolbar} from "../pageObjects/common/toolbar";
import {SideMenu} from '../pageObjects/common/sideMenu';
import {LoginPage} from "../pageObjects/loginPage";
import {MainPage} from "../pageObjects/mainPage";
import {MasterPage} from "../pageObjects/masterPage";
import {PopUp} from "../pageObjects/common/alertPopUp";
import {consts} from '../consts';
import {expect} from 'chai';
import steps from '../steps/actionSteps'
 
 
 describe('Side Menu', () => {

    const sideMenu = new SideMenu();
    const toolbar = new Toolbar();
    const login = new LoginPage();
    const main = new MainPage();
    const popup = new PopUp();
    const master = new MasterPage();

        before(() => {
            login.login(consts.username, consts.password);
            browser.click(toolbar.menuButton);
        });
        
        it('Should contain News button', () => {
            expect(browser.isVisible(sideMenu.news)).to.be.true;
        });

        it('Should contain Gallery button', () => {
            expect(browser.isVisible(sideMenu.gallery)).to.be.true;
        });

        it('Should contain Main Page button', () => {
            expect(browser.isVisible(sideMenu.mainPage)).to.be.true;
        });

        it('Should contain Map button', () => {
            expect(browser.isVisible(sideMenu.map)).to.be.true;
        });

        it('Should contain Logout button', () => {
            expect(browser.isVisible(sideMenu.logoutButton)).to.be.true;
        });

        it('User should be logged out from the app', () => {
            browser.click(sideMenu.logoutButton);
            expect(browser.isVisible(master.alertPopUp)).to.be.true;
            expect(steps.getElementsText(popup.text)).to.equal(consts.logoutMessage);
        });
});