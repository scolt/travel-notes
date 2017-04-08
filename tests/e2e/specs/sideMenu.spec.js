import {Toolbar} from "../pageObjects/common/toolbar";
import {SideMenu} from '../pageObjects/common/sideMenu';
import {LoginPage} from "../pageObjects/loginPage";
import {MainPage} from "../pageObjects/mainPage";
import {HomePage} from "../pageObjects/homePage";
import {MasterPage} from "../pageObjects/masterPage";
import {MapPage} from "../pageObjects/mapPage";
import {GalleryPage} from "../pageObjects/galleryPage";
import {ProfilePage} from "../pageObjects/profilePage";
import {PopUp} from "../pageObjects/common/alertPopUp";
import {consts} from '../consts';
import steps from '../steps/actionSteps';
import validationSteps from '../steps/validationSteps'
 
 
 describe('Side Menu: ', () => {

    const sideMenu = new SideMenu();
    const toolbar = new Toolbar();
    const login = new LoginPage();
    const main = new MainPage();
    const popup = new PopUp();
    const master = new MasterPage();
    const home = new HomePage();
    const profile = new ProfilePage();
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

     describe('Verifiying all needed elements inside the Side Menu for Logged in user', () =>  {

         before(() => {
            login.login(consts.username, consts.password);
            browser.click(toolbar.menuButton);
        });

        it('Should contain all needed links', () => {
            validationSteps.isElementVisible(sideMenu.news);
            validationSteps.isElementVisible(sideMenu.gallery);
            validationSteps.isElementVisible(sideMenu.mainPage);
            validationSteps.isElementVisible(sideMenu.map);
            validationSteps.isElementVisible(sideMenu.profile);
            validationSteps.isElementVisible(sideMenu.logoutButton);
        });
        
        it('Should navigate to Profile page', () => {
            browser.click(sideMenu.profile);
            browser.waitForVisible(profile.pageTitle);
        });

        it('User should be logged out from the app', () => {
            browser.click(toolbar.menuButton);
            browser.click(sideMenu.logoutButton);
            validationSteps.isElementVisible(master.alertPopUp);
            validationSteps.isTextEqual(popup.text, consts.logoutMessage)
            browser.click(popup.okButton);
            validationSteps.isElementVisible(toolbar.logInButton);
            validationSteps.isElementVisible(toolbar.signUpButton);
        });
     });    
});