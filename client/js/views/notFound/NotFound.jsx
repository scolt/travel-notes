'use strict';

let React = require('react');
let {Link} = require('react-router');

let NotFound = React.createClass({
    render() {
        return (
            <div>
                <h1>404 error</h1>
                <h2>page not found</h2>
                <p>We are sorry but the page you are looking for does not exist<br />
                    You could return to the <Link to="/main">homepage</Link></p>
            </div>
        );
    }
});

module.exports = NotFound;
