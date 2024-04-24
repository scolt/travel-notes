import React from 'react';

import Map from '../../../common/components/map/Map';
import withStore from '../../../common/components/withStore/withStore';
import restApi from '../../../common/actions/restApi';
import MyFilter from '../List/components/onlyMyFilter/ComponentOnlyMyFilter';

const MapPage = React.createClass({
    loadMarkers() {
        this.request = this.props.store.dispatch(restApi({
            model: 'notes',
            action: 'markers',
            type: 'prepareMarkers'
        }));
    },

    componentWillunmount() {
        this.props.store.dispatch({
            type: 'resetNoteFilterPayload'
        });
    },

    componentWillMount() {
        this.loadMarkers();
    },

    render() {
        return <div>
            <div>
                <MyFilter onChange={this.loadMarkers}/>
            </div>
            <div className="row">
                <Map markers={this.props.data.notes.markers} type="fullscreen"/>
            </div>
        </div>;
    }
});

export default withStore(MapPage);
