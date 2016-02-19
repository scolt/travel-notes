'use strict';

let React = require('react');

let Menu = require('./components/menu/Menu');
let Footer = require('./components/footer/Footer');

let Layout = React.createClass({
    render() {
        return (
            <div>
                <Menu/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
});

module.exports = Layout;
