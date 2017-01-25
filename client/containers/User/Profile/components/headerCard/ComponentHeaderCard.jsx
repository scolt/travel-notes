import React from 'react';
import {Paper} from 'material-ui';

import EditableInput from 'common/components/editableInput/ComponentEditableInput';
import withStore from 'common/components/withStore/withStore';
import UserImages from '../headerImageCard/ComponentHeaderImageCard';
import ProfileActions from '../headerActions/ComponentHeaderAction';

const HeaderCard = React.createClass({
    getFormFieldByName(name) {
        return this.props.data.users.registerForm.fields.filter((item) => {
            return item.name === name;
        }).pop();
    },

    onFieldChange(e) {
        const {name, value} = e.target;
        this.props.store.dispatch({
            type: 'onChangeFormField',
            model: 'users',
            formName: 'registerForm',
            name,
            value
        });
    },

    render() {
        const firstNameField = this.getFormFieldByName('firstName');
        const lastNameField = this.getFormFieldByName('lastName');
        const aboutField = this.getFormFieldByName('about');

        const isEditMode = this.props.data.users.editMode;
        const profile = this.props.data.users.profile;

        return <div>
            <h1>User Profile</h1>
            <Paper className="user-card">
                <UserImages />
                <ProfileActions />
                <div className="user-details">
                    <div className="user-name">
                        <EditableInput field={firstNameField} editMode={isEditMode} onChange={this.onFieldChange}>
                            {profile.firstName}
                        </EditableInput>
                        &nbsp;
                        <EditableInput field={lastNameField} editMode={isEditMode} onChange={this.onFieldChange}>
                            {profile.lastName}
                        </EditableInput>
                    </div>
                    <EditableInput field={aboutField} editMode={isEditMode} onChange={this.onFieldChange}>
                        <p>{profile.about}</p>
                    </EditableInput>
                </div>
            </Paper>
        </div>;
    }
});

export default withStore(HeaderCard);
