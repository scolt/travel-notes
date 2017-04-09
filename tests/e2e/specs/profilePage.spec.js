import {consts} from "../consts";
import {LoginPage} from "../pageObjects/loginPage";
import {ProfilePage} from "../pageObjects/profilePage";
import {Toolbar} from "../pageObjects/common/toolbar";
import {SideMenu} from '../pageObjects/common/sideMenu';
import steps from '../steps/actionSteps'
import validationSteps from '../steps/validationSteps'

describe('Profile Page', () => {
    const login = new LoginPage();
    const profile = new ProfilePage();
    const sideMenu = new SideMenu();
    const toolbar = new Toolbar();
    
        before(() => {
            login.login(consts.username, consts.password);
            browser.click(toolbar.menuButton);
            browser.waitForVisible(sideMenu.profile);
           });

        it('All needed controls should be displayed', () => {
            browser.click(sideMenu.profile);
            browser.waitForVisible(profile.pageTitle);
            validationSteps.isElementVisible(profile.pageTitle);
            validationSteps.isTextEqual(profile.pageTitle, "User Profile");
            validationSteps.isElementVisible(profile.userName);
        });
});