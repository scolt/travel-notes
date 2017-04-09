import {config} from "../wdio.conf";
import {consts} from "../consts";
import {expect} from 'chai';
import steps from '../steps/actionSteps';
export default {

    isElementVisible(element) {
        expect(browser.isVisible(element), element + " is visible", consts.timeoutForAnimation).to.be.true;
    },

    isElementExisting(element) {
        expect(browser.isExisting(element), element + " is existing", consts.timeoutForAnimation).to.be.true;
    },

    isAttributeEqual(element, attributeName, value) {
         expect(browser.getAttribute(element, attributeName)).to.equal(value);
    },

    isTextEqual(element, text){
        expect(steps.getElementsText(element)).to.equal(text);
    }
}