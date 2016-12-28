import 'landing/alldevices.jpg';
import 'landing/read-about.png';
import 'landing/fav.png';
import 'landing/one.png';
import './landing.styl';

import React from 'react';
import {Card, CardTitle, CardText, Paper, List, ListItem, Divider, RaisedButton} from 'material-ui';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import Contacts from 'material-ui/lib/svg-icons/communication/contacts';
import Wallpaper from 'material-ui/lib/svg-icons/device/wallpaper';
import Schedule from 'material-ui/lib/svg-icons/action/schedule';
import storeMixin from 'mixins/storeMixin';

const paperStyle = {
    marginTop: -10,
    padding: 10,
    display: 'inline-block'
};

const btnStyle = {
    margin: 12
};

const LandingPage = React.createClass({
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
                            <img src="client/assets/landing/one.png" alt=""/>
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
                                <a href="#/register">
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
                                <a href="#/register">
                                    <RaisedButton label="Start use our app right now!!" secondary={true} style={btnStyle} />
                                </a>
                            </Paper>
                        </div>
                        <div className="secondary">
                            <img src="client/assets/landing/read-about.png" alt=""/>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>This is available on any devices</h2>
                    <div className="row main-block">
                        <div className="secondary">
                            <img src="client/assets/landing/alldevices.jpg" alt=""/>
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
                                <a href="#/register">
                                    <RaisedButton label="Start use our app right now!!" secondary={true} style={btnStyle} />
                                </a>
                            </Paper>
                        </div>

                    </div>
                </section>
            </div>
        );
    }
});

export default LandingPage;
