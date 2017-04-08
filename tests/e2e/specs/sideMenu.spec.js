import {Toolbar} from "../pageObjects/common/toolbar";
import {SideMenu} from '../pageObjects/common/sideMenu';
import {LoginPage} from "../pageObjects/loginPage";
import {MainPage} from "../pageObjects/mainPage";
import {HomePage} from "../pageObjects/homePage";
import {MasterPage} from "../pageObjects/masterPage";
import {MapPage} from "../pageObjects/mapPage";
import {GalleryPage} from "../pageObjects/galleryPage";
import {PopUp} from "../pageObjects/common/alertPopUp";
import {consts} from '../consts';
import {expect} from 'chai';
import steps from '../steps/actionSteps'
 
 
 describe('Side Menu: ', () => {

    const sideMenu = new SideMenu();
    const toolbar = new Toolbar();
    const login = new LoginPage();
    const main = new MainPage();
    const popup = new PopUp();
    const master = new MasterPage();
    const home = new HomePage();
    const map = new MapPage();
    const gallery = new GalleryPage();

    describe('User should be able to navigate using side menu links', () =>  {

        beforeEach(() => {
            steps.navigateTo();
            browser.click(toolbar.menuButton);
        });

        it('Should navigate to Main page', () => {
            browser.click(sideMenu.news);
            steps.waitForPageisLoaded(main.url);
        });

        it('Should navigate to Home page', () => {
            browser.click(sideMenu.mainPage);
            steps.waitForPageisLoaded(home.url);
        });

        it('Should navigate to Gallery page', () => {
            browser.click(sideMenu.gallery);
            steps.waitForPageisLoaded(gallery.url);
        });

        it('Should navigate to Map page', () => {
            browser.click(sideMenu.map);
            steps.waitForPageisLoaded(map.url);
        });
    });

     describe('Verifiying all needed elements inside the Side Menu', () =>  {

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
});