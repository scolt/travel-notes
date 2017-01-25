import React from 'react';
import {SelectField, MenuItem} from 'material-ui';

import withStore from 'common/components/withStore/withStore';
import restApi from 'common/actions/restApi';

const OrderFilter = React.createClass({
    orderByChange(e, index, value) {
        this.props.store.dispatch({
            type: 'updateFilter',
            order: value
        });

        this.request = this.props.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    render() {
        const currentKey = Object.keys(this.props.data.notes.filters.order).pop() || 'title';
        return <SelectField
            value={currentKey}
            onChange={this.orderByChange}
            floatingLabelText="Order By"
            className="filter-item"
        >
            <MenuItem key={1} value={'title'} primaryText="Title" />
            <MenuItem key={2} value={'username'} primaryText="User" />
            <MenuItem key={3} value={'_id'} primaryText="Date" />
        </SelectField>;
    }
});

export default withStore(OrderFilter);
