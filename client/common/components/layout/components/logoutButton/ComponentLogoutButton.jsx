import React from 'react';
import {RaisedButton} from 'material-ui';

import withStore from '../../../withStore/withStore';


const LogoutButton = React.createClass({
    logout() {
        this.props.store.dispatch({
            type: 'logout'
        });
    },

    render() {
        return <div className="col-md-12">
            <RaisedButton
                id="logoutMenuButton"
                label="Logout"
                primary={true}
                style={{width: '100%'}}
                onTouchTap={() => {
                    this.logout();
                }}
            />
        </div>;
    }
});

export default withStore(LogoutButton);
