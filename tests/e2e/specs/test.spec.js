import {TestPage} from '../pageObjects/test.po';
import {expect} from 'chai';

describe('DuckDuckGo search', function() {
    const test = new TestPage();

    it('searches for WebdriverIO', function() {
        browser.url('https://duckduckgo.com/');
        expect(test.username).to.equal('test');
    });

    it('searches for WebdriverIO 2', function() {
        const test = new TestPage();
        browser.url('https://duckduckgo.com/');
        expect(test.username).to.equal('test');
    });
});
