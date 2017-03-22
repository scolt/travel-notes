import React from 'react';
import Icon from 'react-fa';
import {RaisedButton} from 'material-ui';
import 'landing/alldevices.png';
import 'landing/one.png';
import './landing.styl';

const NotFound = React.createClass({
    render() {
        return <div className="landing-page">
            <section className="header-section">
                <header>
                    <h1>Travel Note</h1>
                    <p>Store your travel experience! Open new horizons!</p>
                    <RaisedButton id="getStarted" label="Get Started"  href="#/register"/>
                </header>
                <img src="images/alldevices.png" alt="Travel Note - all platforms"/>
            </section>
            <section className="page">
                <h2>We help to store your memories and impressions</h2>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="icon">
                            <Icon name="cloud"/>
                        </div>
                        <div className="text">
                            Store your memories about some places. Add photo and get access to your past trips anywhere.
                        </div>
                    </div>
                    <div className="col-md-4  col-sm-6 col-xs-12">
                        <div className="icon">
                            <Icon name="comments-o"/>
                        </div>
                        <div className="text">
                            Send your own opinion about different cities, towns and places for interest.
                        </div>
                    </div>
                    <div className="col-md-4  col-sm-6 col-xs-12">
                        <div className="icon">
                            <Icon name="map-marker"/>
                        </div>
                        <div className="text">
                            See map with your achievements and plan your next steps.
                        </div>
                    </div>
                </div>
            </section>
            <section className="map-page">
                <h2>Look all you travel experience on one map</h2>
                <img src="images/one.png" alt="Travel Note - Map"/>
            </section>
            <section className="page">
                <h2>Read about new places and new details about you favorites places</h2>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="icon">
                            <Icon name="file-text-o"/>
                        </div>
                        <div className="text">
                            Read about new places.
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="icon">
                            <Icon name="camera-retro"/>
                        </div>
                        <div className="text">
                            Look photos from places where you never been.
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="icon">
                            <Icon name="smile-o"/>
                        </div>
                        <div className="text">
                            Use best practice from other peoples.
                        </div>
                    </div>
                </div>
            </section>
        </div>;
    }
});

export default NotFound;
