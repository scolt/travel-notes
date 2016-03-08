'use strict';

let React = require('react');

let Card = require('material-ui/lib/card/card');
let CardText = require('material-ui/lib/card/card-text');

let storeMixin = require('mixins/storeMixin');

const style = {
    backgroundColor: 'grey'
};

let Footer = React.createClass({
    mixins: [
        storeMixin
    ],

    render() {
        return (
            <Card>
                <CardText style={style}>
                    &copy;2016 TravelNote {this.state.counter}
                </CardText>
            </Card>
        );
    }
});

module.exports = Footer;
