import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faSave, faSmile, faWindowClose} from '@fortawesome/free-regular-svg-icons';
import {FloatingActionButton} from 'material-ui';

import restApi from '../../../../../common/actions/restApi';
import withStore from '../../../../../common/components/withStore/withStore';

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
                    <FloatingActionButton mini={true} onTouchTap={this.changeEditStatus.bind(this, true)}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </FloatingActionButton>
                </div> :
                <div>
                    <FloatingActionButton mini={true} secondary={true} disabled={!isValid} style={{marginBottom: '10px'}} onTouchTap={this.saveProfile}>
                        <FontAwesomeIcon icon={faSave}/>
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} onTouchTap={this.changeEditStatus.bind(this, false)}>
                        <FontAwesomeIcon icon={faWindowClose}/>
                    </FloatingActionButton>
                </div>}
        </div>;

        return <div>
            {owner ? card : null}
        </div>;
    }
});

export default withStore(UsersActions);
