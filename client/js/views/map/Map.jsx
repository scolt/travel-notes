'use strict';

import React from 'react';
import Map from 'components/map/Map';
import Icon from 'react-fa';

import storeMixin from 'mixins/storeMixin';

let MapPage = React.createClass({
    fetchModel: {
        name: 'notes'
    },

    mixins: [
        storeMixin
    ],

    render() {
        return (
            <div className="row">
                {this.state.net.isFetching ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : <Map markers={this.state.notes} type="fullscreen"/>}
            </div>
        );
    }
});

module.exports = MapPage;
