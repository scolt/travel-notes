'use strict';

let React = require('react');
let {Link} = require('react-router');

let Menu = React.createClass({
    render() {
        return (
            <div>
                <strong>Menu</strong>
                <ul>
                    <li><Link to="/main">Main</Link></li>
                    <li><Link to="/note">Note</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
        );
    }
});

module.exports = Menu;
