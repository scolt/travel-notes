import {Toolbar} from "../pageObjects/common/toolbar";
import {SideMenu} from '../pageObjects/common/sideMenu';
import {LoginPage} from "../pageObjects/loginPage";
import {consts} from '../consts';
import {expect} from 'chai';
import steps from '../steps/actionSteps'
 
 
 describe('Side Menu', () => {

    const sideMenu = new SideMenu();
    const toolbar = new Toolbar();
    const login = new LoginPage();

        before(() => {
            steps.navigateTo();
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

        it('Should not contain Logout button for Non Authorized users', () => {
            expect(browser.isVisible(sideMenu.logoutButton)).to.be.false;
        });

        it('Should contain Logout button for Non Authorized users', () => {
            steps.navigateTo(login.url);
            login.login(consts.username, consts.password);
            browser.click(toolbar.menuButton);
            expect(browser.isVisible(sideMenu.logoutButton)).to.be.true;
        });
});