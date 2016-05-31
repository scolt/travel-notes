'use strict';

import React from 'react';
import Map from 'components/map/Map';
import Icon from 'react-fa';
import restApi from 'actions/restApi';
import store from 'store';

import storeMixin from 'mixins/storeMixin';

let MapPage = React.createClass({
    mixins: [storeMixin],

    afterComponentWillMount() {
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            action: 'read',
            reducer: 'map'
        }));
    },

    processMarkers (markers) {
        return markers.map(function (item) {
            return {
                window: {
                    descr: item.text,
                    title: item.title,
                    link: '/#/note/' + item.id,
                    photo: item.photo
                },
                position: {
                    lng: item.lng,
                    lat: item.lat
                }
            };
        });
    },

    render() {
        var result = [];
        if (this.state.map.row.result) {
            result = this.processMarkers(this.state.map.row.result);
        }

        return (
            <div className="row">
                {this.state.net.isFetching ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : <Map markers={result} type="fullscreen"/>}
            </div>
        );
    }
});

module.exports = MapPage;
