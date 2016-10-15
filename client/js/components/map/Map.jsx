'use strict';

import './map.styl';

import React from 'react';

import {GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import {default as MapLoader} from 'react-google-maps/lib/async/ScriptjsLoader';
import MarkerClusterer from  'react-google-maps/lib/addons/MarkerClusterer';

import {Card, CardActions, CardTitle, CardMedia, RaisedButton, CardText} from 'material-ui';

import Icon from 'react-fa';

import m1 from 'm1.png';
import m2 from 'm2.png';
import m3 from 'm3.png';
import m4 from 'm4.png';
import m5 from 'm5.png';

let Map = React.createClass({
    propTypes: {
        markers: React.PropTypes.array,
        center: React.PropTypes.object,
        type: React.PropTypes.string,
        canSetMarker: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            type: 'embedded',
            canSetMarker: () => {}
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

    renderInfoWindow(ref, marker) {
        if (!marker.window) return null;
        let content = null;
        let info =
            <div>
                <CardTitle title={marker.window.title} subtitle={marker.window.subtitle}/>
                <CardText>
                    {marker.window.descr}
                </CardText>
                <CardActions>
                    {marker.window.link ? <a href={marker.window.link}><RaisedButton label="Open"/></a> : null}
                </CardActions>
            </div>;
        if (marker.window.photo) {
            content =
                <CardMedia
                    overlay={ info }
                    overlayContentStyle={{background: 'rgba(255,255,255,0.85)'}}
                    mediaStyle={{overflow: 'hidden', maxHeight: '450px'}}
                >
                    <img src={marker.window.photo}/>
                </CardMedia>;
        } else {
            content = info;
        }
        return (
            <InfoWindow key={`${ref}_info_window`}>
                <Card>
                    {content}
                </Card>
            </InfoWindow>
        );
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
            <MapLoader
                protocol = {"https"}
                hostname = {"maps.googleapis.com"}
                pathname = {"/maps/api/js"}
                query = {{libraries: 'geometry,drawing,places', key: 'AIzaSyDhPscmwqwWDhwQiqR_tAP-rW0z6S1kEog'}}
                loadingElement = {
                    <div className="spinner"><Icon name="circle-o-notch" spin/></div>
                }
                containerElement={
                    <div className={'map ' + this.props.type}></div>
                }
                googleMapElement={
                    <GoogleMap
                        defaultZoom={3}
                        defaultCenter={this.props.center || {lat: 48.2, lng: 16.366667}}
                        onClick={this.handleMapClick}>
                        <MarkerClusterer
                            styles={styles}
                        >
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
            />);
    }
});

module.exports = Map;
