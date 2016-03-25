'use strict';

let React = require('react');
let Menu = require('./components/menu/Menu');
let Footer = require('./components/footer/Footer');

let storeMixin = require('mixins/storeMixin');

import 'flexboxgrid/dist/flexboxgrid.min.css';

let store = require('store');

let Layout = React.createClass({
    mixins: [
        storeMixin
    ],

    render() {
        return (
            <div>
                <div className="header"><Menu menu={this.state.menu}/></div>
                <div className="col-xs-12">
                    {this.props.children}
                </div>
                <div className="footer"><Footer/></div>
            </div>
        );
    }
});

module.exports = Layout;
