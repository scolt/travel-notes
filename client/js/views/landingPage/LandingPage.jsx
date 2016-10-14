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

import 'landing/alldevices.jpg';
import 'landing/read-about.png';
import 'landing/fav.png';
import 'landing/one.png';
import './landing.styl';

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
            <div className="landing">
                <h1>Travel Note - we keep you Impression</h1>
                <section>
                    <h2>You can store all you travelers in one place</h2>
                    <div className="row main-block">
                        <div className="secondary">
                            <img src="/client/assets/landing/one.png" alt=""/>
                        </div>
                        <div className="primary">
                            <Paper style={paperStyle} zDepth={0}>
                                <h3 style={{padding: 10}}>We provide to you ability to:</h3>
                                <Divider />
                                <List>
                                  <ListItem primaryText="Store you memories about your travelers" leftIcon={<Contacts />} />
                                  <ListItem primaryText="Send your own opinion about different cities, towns and places for interest" leftIcon={<ActionGrade />} />
                                  <ListItem primaryText="Look photos from places you are going to and post photos from places you've been" leftIcon={<Wallpaper />} />
                                  <ListItem primaryText="See map with your achievements and plan your next steps" leftIcon={<Schedule />} />
                                </List>
                                <a href="/#/register">
                                    <RaisedButton label="Start use our app right now!!" secondary={true} style={btnStyle} />
                                </a>
                            </Paper>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Read about new places and new details about you favorites places</h2>
                    <div className="row main-block">
                        <div className="primary">
                            <Paper style={paperStyle} zDepth={0}>
                                <h3 style={{padding: 10}}>We provide to you ability to:</h3>
                                <Divider />
                                <List>
                                    <ListItem primaryText="Read about new places" leftIcon={<Contacts />} />
                                    <ListItem primaryText="Send your own opinion about notes from other peoples" leftIcon={<ActionGrade />} />
                                    <ListItem primaryText="Look photos from places where you never been" leftIcon={<Wallpaper />} />
                                    <ListItem primaryText="Better planning for you vacations" leftIcon={<Schedule />} />
                                    <ListItem primaryText="Use best practice from other peoples" leftIcon={<Schedule />} />
                                    <ListItem primaryText="Just get a fun :)" leftIcon={<Schedule />} />
                                </List>
                                <a href="/#/register">
                                    <RaisedButton label="Start use our app right now!!" secondary={true} style={btnStyle} />
                                </a>
                            </Paper>
                        </div>
                        <div className="secondary">
                            <img src="/client/assets/landing/read-about.png" alt=""/>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>This is available on any devices</h2>
                    <div className="row main-block">
                        <div className="secondary">
                            <img src="/client/assets/landing/alldevices.jpg" alt=""/>
                        </div>
                        <div className="primary">
                            <Paper style={paperStyle} zDepth={0}>
                                <h3 style={{padding: 10}}>We provide to you ability to:</h3>
                                <Divider />
                                <List>
                                    <ListItem primaryText="You can create notes everywhere" leftIcon={<Contacts />} />
                                    <ListItem primaryText="You can add your own impression from your phone" leftIcon={<ActionGrade />} />
                                    <ListItem primaryText="Support all modern browser" leftIcon={<Wallpaper />} />
                                </List>
                                <a href="/#/register">
                                    <RaisedButton label="Start use our app right now!!" secondary={true} style={btnStyle} />
                                </a>
                            </Paper>
                        </div>

                    </div>
                </section>
            </div>
            //<Card>
            //    <CardTitle title="Welcome to our Landing Page" subtitle="TravelNote" />
            //    <CardText>
            //        <Paper style={paperStyle} zDepth={3}>
            //            <h3 style={{padding: 10}}>We provide to you ability to:</h3>
            //            <Divider />
            //            <List>
            //              <ListItem primaryText="Get fresh news about palces where you are going to" leftIcon={<Contacts />} />
            //              <ListItem primaryText="Send your own opinion about different cities, towns and places for interest" leftIcon={<ActionGrade />} />
            //              <ListItem primaryText="Look photos from places you are going to and post photos from places you've been" leftIcon={<Wallpaper />} />
            //              <ListItem primaryText="Plan your vacation more efficiently" leftIcon={<Schedule />} />
            //            </List>
            //            <RaisedButton label="Plan wonderful vacation with us!" secondary={true} style={btnStyle} />
            //        </Paper>
            //    </CardText>
            //</Card>
        );
    }
});

module.exports = LandingPage;
