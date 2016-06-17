'use strict';

import React from 'react';
import Icon from 'react-fa';

import Map from 'components/map/Map';

import restApi from 'actions/restApi';

import storeMixin from 'mixins/storeMixin';

const MapPage = React.createClass({
    mixins: [storeMixin],

    afterComponentWillMount() {
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            action: 'read',
            reducer: 'map'
        }));
    },

    render() {
        return (
            <div className="row">
                <Map markers={this.state.map.markers} type="fullscreen"/>
            </div>
        );
    }
});

module.exports = MapPage;
