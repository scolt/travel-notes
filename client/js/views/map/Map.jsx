'use strict';

import React from 'react';
import Map from 'components/map/Map';
import store from 'store';
import getMarkers from 'actions/getMarkers';
import Icon from 'react-fa';

let MapPage = React.createClass({

    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        store.dispatch(getMarkers());
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    handleStoreChange() {
        let state = this.store.getState();
        this.setState(state);
    },

    processMarkers(markers = []) {
        return markers.map(item => {
            item.window = item;
            item.window.link = `#/note/${item.id}`;
            return item;
        });
    },

    render() {
        let mapInfo = this.state.markers;
        let markers = this.processMarkers(mapInfo.rows);

        return (
            <div className="row">
                {mapInfo.isFetching ? <div className="spinner"><Icon name="spinner" spin/></div> : <Map markers={markers} type="fullscreen"/>}
            </div>
        );
    }
});

module.exports = MapPage;
