import {config} from "../wdio.conf";
import {consts} from "../consts";
import {expect} from 'chai';
import steps from '../steps/actionSteps';
export default {

    isElementVisible(element) {
        expect(browser.isVisible(element), element + " is visible", consts.timeoutForAnimation).to.be.true;
    },

    isElementNotVisible(element) {
        expect(browser.isVisible(element), element + " is not visible", consts.timeoutForAnimation).to.be.false;
    },

    isElementExisting(element) {
        expect(browser.isExisting(element), element + " is existing", consts.timeoutForAnimation).to.be.true;
    },

    isElementNotExisting(element) {
        expect(browser.isExisting(element), element + " is not existing", consts.timeoutForAnimation).to.be.false;
    },

    isAttributeEqual(element, attributeName, value) {
         expect(browser.getAttribute(element, attributeName)).to.equal(value);
    },

    isTextEqual(element, text){
        expect(steps.getElementsText(element)).to.equal(text);
    },

    isURLContaining(text){
        expect(browser.getUrl(), "Url does not contain needed value").to.contain(text);
    }
}