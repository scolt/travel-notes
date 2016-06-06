'use strict';

import React from 'react';
let {PropTypes: propTypes} = React;

import {GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import {default as MapLoader} from 'react-google-maps/lib/async/ScriptjsLoader';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import MarkerClusterer from  'react-google-maps/lib/addons/MarkerClusterer';
import Icon from 'react-fa';
import './map.styl';
import 'm1.png';
import 'm2.png';
import 'm3.png';
import 'm4.png';
import 'm5.png';

let Map = React.createClass({
    propTypes: {
        markers: propTypes.array,
        center: propTypes.object,
        type: propTypes.string
    },

    getDefaultProps() {
        return {
            type: 'embedded'
        };
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
            <InfoWindow key={`${ref}_info_window`} onCloseclick={this.handleCloseclick.bind(this, marker)}>
                <Card>
                    {content}
                </Card>
            </InfoWindow>
        );
    },

    render() {
        var styles = [{
                height: 53,
                url: '/client/assets/m1.png',
                width: 53
            },
            {
                height: 56,
                url: '/client/assets//m2.png',
                width: 56
            },
            {
                height: 66,
                url: '/client/assets//m3.png',
                width: 66
            },
            {
                height: 78,
                url: '/client/assets//m4.png',
                width: 78
            },
            {
                height: 90,
                url: '/m5.png',
                width: 90
            }];


        return (
            <MapLoader
                hostname={"maps.googleapis.com"}
                pathname={"/maps/api/js"}
                query={{libraries: 'geometry,drawing,places'}}
                loadingElement={
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
