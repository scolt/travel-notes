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
                <CardTitle title={marker.window.title} subtitle={marker.window.subtitle} />
                <CardText>
                    {marker.window.descr}
                </CardText>
                <CardActions>
                    {marker.window.link ? <a href={marker.window.link}><RaisedButton label="Open" /></a> : null}
                </CardActions>
            </div>;
        if (marker.window.photo) {
            content =
                <CardMedia
                    overlay={ info }
                    overlayContentStyle={{background: 'rgba(255,255,255,0.85);'}}
                    mediaStyle={{overflow: 'hidden', 'max-height': '450px'}}
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
        return (
            <MapLoader
                hostname={"maps.googleapis.com"}
                pathname={"/maps/api/js"}
                query={{libraries: 'geometry,drawing,places'}}
                loadingElement={
                    <Icon name="spinner" spin/>
                }
                containerElement={
                    <div className={'map ' + this.props.type}></div>
                }
                googleMapElement={
                    <GoogleMap
                        defaultZoom={3}
                        defaultCenter={this.props.center || {lat: 48.2, lng: 16.366667}}
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
            />);
    }
});


module.exports = Map;
