import './styl/map.styl';

import React from 'react';

import {
    withGoogleMap,
    GoogleMap,
    InfoWindow,
    Marker
} from 'react-google-maps';

import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import MarkerClusterer from  'react-google-maps/lib/addons/MarkerClusterer';

import {Card, CardActions, CardTitle, CardMedia, RaisedButton, CardText} from 'material-ui';
import config from '../../config/config';
import Icon from 'react-fa';

import m1 from 'm1.png';
import m2 from 'm2.png';
import m3 from 'm3.png';
import m4 from 'm4.png';
import m5 from 'm5.png';
import 'banner.jpg';

const GoogleMapConstructor = withScriptjs(
    withGoogleMap(
        props => (
            <GoogleMap
                defaultZoom={3}
                defaultCenter={props.center || {lat: 48.2, lng: 16.366667}}
                onClick={props.onMapClick}>
                <MarkerClusterer
                    styles={props.clusterStyles}
                >
                    {props.markers.map((marker, index) => {
                        const ref = `marker_${index}`;
                        return (
                            <Marker
                                {...marker}
                                key={ref}
                                onClick={() => props.onMarkerClick(marker)}>
                                {marker.showInfo ?
                                    <InfoWindow key={`${ref}_info_window`} onCloseClick={() => props.onMarkerClose(marker)} className="map-info-window">
                                        <Card className="map-info-card">
                                            <CardMedia
                                                overlay={<CardTitle title={marker.window.title} subtitle={marker.window.subtitle} />}
                                            >
                                                {<img src={marker.window.photo || 'client/assets/banner.jpg'}/>}
                                            </CardMedia>
                                            <CardText>
                                                {marker.window.descr}
                                            </CardText>
                                            <CardActions>
                                                {marker.window.link ? <a href={marker.window.link}><RaisedButton label="Open"/></a> : null}
                                            </CardActions>
                                        </Card>
                                    </InfoWindow> : null}
                            </Marker>
                        );
                    })}
                </MarkerClusterer>
            </GoogleMap>
        )
    )
);

let Map = React.createClass({
    propTypes: {
        markers: React.PropTypes.array,
        center: React.PropTypes.object,
        type: React.PropTypes.string,
        canSetMarker: React.PropTypes.any
    },

    getDefaultProps() {
        return {
            type: 'embedded',
            canSetMarker: false
        };
    },

    handleMarkerClick(marker) {
        marker.showInfo = true;
        this.setState(this.props.markers);
    },

    handleMapClick(markerProvider) {
        if (this.props.canSetMarker) {
            let marker = {
                lat: markerProvider.latLng.lat(),
                lng: markerProvider.latLng.lng()
            };
            this.props.canSetMarker(marker);
        }
    },

    handleMarkerClose(marker) {
        marker.showInfo = false;
        this.setState(this.props.markers);
    },

    generateUrl() {
        const params = {libraries: 'geometry,drawing,places', key: config.googleMapKey};
        const query = Object.keys(params).reduce((result, key) => result += `${key}=${params[key]}&`, '?');
        return `https://maps.googleapis.com/maps/api/js${query}`;
    },

    render() {
        const styles = [
            {
                height: 53,
                url: m1,
                width: 53
            },
            {
                height: 56,
                url: m2,
                width: 56
            },
            {
                height: 66,
                url: m3,
                width: 66
            },
            {
                height: 78,
                url: m4,
                width: 78
            },
            {
                height: 90,
                url: m5,
                width: 90
            }
        ];

        return (
            <GoogleMapConstructor
                googleMapURL={this.generateUrl()}
                loadingElement = {
                    <div className="spinner"><Icon name="circle-o-notch" spin/></div>
                }
                containerElement={
                    <div className={'map ' + this.props.type}></div>
                }
                mapElement={
                    <div style={{ height: '100%' }} />
                }
                center={this.props.center}
                markers={this.props.markers}
                clusterStyles={styles}
                onMarkerClick={this.handleMarkerClick}
                onMapClick={this.handleMapClick}
                onMarkerClose={this.handleMarkerClose}
            />);
    }
});

export default Map;
