'use strict';

let React = require('react');

let Card = require('material-ui/lib/card/card');
let CardText = require('material-ui/lib/card/card-text');

const style = {
    backgroundColor: 'grey'
};

let Footer = React.createClass({
    render() {
        return (
            <Card>
                <CardText style={style}>
                    &copy;2016 TravelNote
                </CardText>
            </Card>
        );
    }
});

module.exports = Footer;
