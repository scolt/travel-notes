'use strict';

import React from 'react';
let {PropTypes: propTypes} = React;

import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import MarkerClusterer from  'react-google-maps/lib/addons/MarkerClusterer';
import styles from './map.styl';

let Map = React.createClass({
    propTypes: {
        markers: propTypes.array,
        center: propTypes.object
    },

    handleMarkerClick(marker) {
        marker.showInfo = true;
        this.setState(this.props.markers);
    },

    handleCloseclick(marker) {
        marker.showInfo = false;
        this.setState(this.props.markers);
    },

    renderInfoWindow(ref, marker) {
        return (
            <InfoWindow key={`${ref}_info_window`} onCloseclick={this.handleCloseclick.bind(this, marker)}>
                <Card>
                    <CardTitle title={marker.window.title} subtitle={marker.window.subtitle} />
                    <CardText>
                        {marker.window.descr}
                    </CardText>
                    <CardActions>
                        <a href={marker.window.link}><RaisedButton label="Open" /></a>
                    </CardActions>
                </Card>
            </InfoWindow>
        );
    },

    render() {

        return (
            <GoogleMapLoader
                containerElement={
                  <div className="map"/>
                }
                googleMapElement={
                  <GoogleMap
                    defaultZoom={7}
                    defaultCenter={this.props.center || {lat: 25.0112183, lng: 121.620675700003}}
                    onClick={this.handleMapClick}>
                    <MarkerClusterer>
                    {this.props.markers.map((marker, index) => {
                        const ref = `marker_${index}`;
                        return (
                            <Marker
                              {...marker}
                              key={ref}
                              onClick={this.handleMarkerClick.bind(this, marker)}>
                              {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
                            </Marker>
                        );
                    })}
                    </MarkerClusterer>
                  </GoogleMap>
                }
            />
        );
    }
});


module.exports = Map;
