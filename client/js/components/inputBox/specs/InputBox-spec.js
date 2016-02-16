'use strict';

let React = require('react');
let TestUtils = require('react/lib/ReactTestUtils');
let InputBox = require('../InputBox');

describe('InputBox', () => {
    beforeEach(function () {
        this.className = 'inputBox';
        this.value = '';
        this.component = TestUtils.renderIntoDocument(
            <InputBox className={this.className} value={this.value}/>
        );
    });

    it('component is composite (created by React.createClass)', function () {
        expect(TestUtils.isCompositeComponent(this.component)).toBeTruthy();
    });

    it('className is set', function () {
        let component = TestUtils.scryRenderedDOMComponentsWithClass(this.component, this.className);
        expect(component.length).toBeTruthy();
    });

    it('value is set', function () {
        let component = TestUtils.findRenderedDOMComponentWithClass(this.component, this.className);
        expect(component.textContent).toBe(this.value);
    });
});
