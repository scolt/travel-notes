import React from 'react';
import {Paper, Subheader, ListItem, List} from 'material-ui';

import EditableInput from '../../../../../common/components/editableInput/ComponentEditableInput';
import withStore from '../../../../../common/components/withStore/withStore';

const ContactsCard = React.createClass({
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
        const emailField = this.getFormFieldByName('email');
        const skypeField = this.getFormFieldByName('skype');
        const websiteField = this.getFormFieldByName('website');

        const isEditMode = this.props.data.users.editMode;
        const profile = this.props.data.users.profile;

        return <Paper style={{minHeight: '100%'}}>
            <List>
                <Subheader>Contacts</Subheader>
                <EditableInput field={emailField} editMode={isEditMode} onChange={this.onFieldChange}>
                    <ListItem
                        primaryText={isEditMode ? emailField.value : profile.email}
                        secondaryText="Email"
                    />
                </EditableInput>
                <EditableInput field={skypeField} editMode={isEditMode} onChange={this.onFieldChange}>
                    <ListItem
                        primaryText={isEditMode ? skypeField.value : profile.skype}
                        secondaryText="Skype"
                    />
                </EditableInput>
                <EditableInput field={websiteField} editMode={isEditMode} onChange={this.onFieldChange}>
                    <ListItem
                        primaryText={isEditMode ? websiteField.value : profile.website}
                        secondaryText="Website"
                    />
                </EditableInput>
            </List>
        </Paper>;
    }
});

export default withStore(ContactsCard);
