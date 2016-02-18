'use strict';

let React = require('react');
let TestUtils = require('react/lib/ReactTestUtils');
let DeveloperList = require('../DeveloperBox');

describe('DeveloperList', () => {
    beforeEach(function () {
        this.component = TestUtils.renderIntoDocument(
            <DeveloperList />
        );
    });

    it('component is composite (created by React.createClass)', function () {
        expect(TestUtils.isCompositeComponent(this.component)).toBeTruthy();
    });

});
