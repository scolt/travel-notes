import React from 'react';
import {Toggle} from 'material-ui';

import withStore from 'common/components/withStore/withStore';
import restApi from 'common/actions/restApi';

const styles = {
    checkbox: {
        float: 'right',
        width: '190px',
        paddingRight: '25px',
        margin: '33px 0 '
    }
};

const OrderFilter = React.createClass({
    authorSelect(e, value) {
        const {username} = this.props.data.users.user;
        this.props.store.dispatch({
            type: 'updateFilter',
            filters: {
                userId: value ? username : null
            }
        });

        this.request = this.props.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    render() {
        const currentStatus = this.props.data.notes.filters.filters.userId === this.props.data.users.user.username;
        return <div style={styles.checkbox}>
            {this.props.data.users.user.email ? <Toggle
                label="Only My Notes"
                labelPosition="left"
                onToggle={this.authorSelect}
                toggled={currentStatus}
            /> : null}
        </div>;
    }
});

export default withStore(OrderFilter);
