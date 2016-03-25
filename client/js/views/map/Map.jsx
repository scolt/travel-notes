'use strict';

import React from 'react';
import Map from 'components/map/Map';
import Icon from 'react-fa';

import storeMixin from 'mixins/storeMixin';

let MapPage = React.createClass({
    fetchModel: 'notes',

    mixins: [
        storeMixin
    ],

    render() {
        return (
            <div className="row">
                {mapInfo.isFetching ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : <Map markers={markers} type="fullscreen"/>}
            </div>
        );
    }
});

module.exports = MapPage;
