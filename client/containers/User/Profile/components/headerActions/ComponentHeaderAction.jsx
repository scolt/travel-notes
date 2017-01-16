import React from 'react';
import Icon from 'react-fa';
import {FloatingActionButton} from 'material-ui';

import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';

const UsersActions = React.createClass({
    changeEditStatus(val) {
        this.props.store.dispatch({
            type: val ? 'enableUserEditMode' : 'disableUserEditMode'
        });
    },

    componentWillUnmount() {
        this.changeEditStatus(false);
    },

    saveProfile() {
        this.props.store.dispatch({
            type: 'prepareUserPayload'
        });

        this.props.store.dispatch(restApi({
            model: 'users',
            action: 'update',
            type: 'updateUser'
        }));
    },

    render() {
        const isEditMode = this.props.data.users.editMode;
        const owner = this.props.data.users.profile.owner;
        const isValid = this.props.data.users.registerForm.isValid;
        const card = <div className="actions">
            {!isEditMode ?
                <div>
                    <FloatingActionButton mini={true} primary={true} onTouchTap={this.changeEditStatus.bind(this, true)}>
                        <Icon name="pencil"/>
                    </FloatingActionButton>
                </div> :
                <div>
                    <FloatingActionButton mini={true} secondary={true} disabled={!isValid} style={{marginBottom: '10px'}} onTouchTap={this.saveProfile}>
                        <Icon name="floppy-o"/>
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} primary={true} onTouchTap={this.changeEditStatus.bind(this, false)}>
                        <Icon name="times"/>
                    </FloatingActionButton>
                </div>}
        </div>;

        return <div>
            {owner ? card : null}
        </div>;
    }
});

export default withStore(UsersActions);
