import React from 'react';
import Icon from 'react-fa';
import Map from 'components/map/Map';
import restApi from 'actions/restApi';
import storeMixin from 'mixins/storeMixin';

const MapPage = React.createClass({
    mixins: [storeMixin],

    componentWillMount() {
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            type: 'prepareMarkers'
        }));
    },

    render() {
        return (
            <div className="row">
                <Map markers={this.state.notes.markers} type="fullscreen"/>
            </div>
        );
    }
});

export default MapPage;
