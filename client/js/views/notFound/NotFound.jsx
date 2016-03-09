'use strict';

let React = require('react');
let Card = require('material-ui/lib/card/card');
let CardTitle = require('material-ui/lib/card/card-title');
let CardText = require('material-ui/lib/card/card-text');
let {Link} = require('react-router');

let NotFound = React.createClass({
    render() {
        return (
            <Card>
                <CardTitle title="404 error" subtitle="page not found" />
                <CardText>We are sorry but the page you are looking for does not exist<br />
                    You could return to the <Link to="/main">homepage</Link>
                </CardText>
            </Card>
        );
    }
});

module.exports = NotFound;
