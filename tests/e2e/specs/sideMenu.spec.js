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
        
        it('Should contain all needed links', () => {
            expect(browser.isVisible(sideMenu.news), "News link is presented").to.be.true;
            expect(browser.isVisible(sideMenu.gallery), " Gallery link is presented").to.be.true;
            expect(browser.isVisible(sideMenu.mainPage), "Main page link is presented").to.be.true;
            expect(browser.isVisible(sideMenu.map), "Map link is presented").to.be.true;
            expect(browser.isVisible(sideMenu.logoutButton), "Logout button is presented for logged in user").to.be.true;
        });

        it('User should be logged out from the app', () => {
            browser.click(sideMenu.logoutButton);
            expect(browser.isVisible(master.alertPopUp), "Alert popup is displayed").to.be.true;
            expect(steps.getElementsText(popup.text)).to.equal(consts.logoutMessage);
            browser.click(popup.okButton);
            expect(browser.isVisible(toolbar.logInButton), "Login button is presented").to.be.true;
            expect(browser.isVisible(toolbar.signUpButton), "Sign up button is presented").to.be.true;
        });
});