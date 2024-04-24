import React from 'react';
import {Toggle} from 'material-ui';

import withStore from '../../../../../common/components/withStore/withStore';

const styles = {
    checkbox: {
        float: 'right',
        width: '190px',
        paddingRight: '25px',
        margin: '33px 0 ',
        position: 'relative',
        zIndex: '10'
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

        this.props.onChange();
    },

    render() {
        const currentStatus = this.props.data.notes.filters.filters.userId === this.props.data.users.user.username;
        return <div style={this.props.data.users.user.email ? styles.checkbox : {}}>
            {this.props.data.users.user.email ? <Toggle
                label="Only My Notes"
                id="onlyMyButton"
                labelPosition="left"
                onToggle={this.authorSelect}
                toggled={currentStatus}
            /> : null}
        </div>;
    }
});

export default withStore(OrderFilter);
