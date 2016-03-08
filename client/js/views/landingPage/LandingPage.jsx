'use strict';

let React = require( 'react');

let Card = require('material-ui/lib/card/card');
let CardTitle = require('material-ui/lib/card/card-title');
let CardText = require('material-ui/lib/card/card-text');
let Paper = require('material-ui/lib/paper');
let List = require('material-ui/lib/lists/list');
let ListItem = require('material-ui/lib/lists/list-item');
let ActionGrade = require('material-ui/lib/svg-icons/action/grade');
let Contacts = require('material-ui/lib/svg-icons/communication/contacts');
let Wallpaper = require('material-ui/lib/svg-icons/device/wallpaper');
let Schedule = require('material-ui/lib/svg-icons/action/schedule');
let Divider = require('material-ui/lib/divider');
let RaisedButton = require('material-ui/lib/raised-button');

let storeMixin = require('mixins/storeMixin');

const paperStyle = {
    marginTop: -10,
    padding: 10,
    display: 'inline-block'
};

const btnStyle = {
    margin: 12
};

let LandingPage = React.createClass({
    mixins: [
        storeMixin
    ],

    componentDidMount() {
        this.store.dispatch({type: 'inc'});
    },

    render() {
        return (
            <Card>
                <CardTitle title="Welcome to our Landing Page" subtitle="TravelNote" />
                <CardText>
                    <Paper style={paperStyle} zDepth={3}>
                        <h3 style={{padding: 10}}>We provide to you ability to:</h3>
                        <Divider />
                        <List>
                          <ListItem primaryText="Get fresh news about palces where you are going to" leftIcon={<Contacts />} />
                          <ListItem primaryText="Send your own opinion about different cities, towns and places for interest" leftIcon={<ActionGrade />} />
                          <ListItem primaryText="Look photos from places you are going to and post photos from places you've been" leftIcon={<Wallpaper />} />
                          <ListItem primaryText="Plan your vacation more efficiently" leftIcon={<Schedule />} />
                        </List>
                        <RaisedButton label="Plan wonderful vacation with us!" secondary={true} style={btnStyle} />
                    </Paper>
                </CardText>
            </Card>
        );
    }
});

module.exports = LandingPage;
