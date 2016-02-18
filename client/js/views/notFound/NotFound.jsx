'use strict';

let React = require('react');
let {Link} = require('react-router');

let NotFound = React.createClass({
    render() {
        return (
            <div>
                <strong>404</strong>
                <Link to="/main">Main</Link>
            </div>
        );
    }
});

module.exports = NotFound;
