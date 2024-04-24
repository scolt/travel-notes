import React from 'react';
import {Paper, Subheader, ListItem, List, RadioButtonGroup, RadioButton, DatePicker} from 'material-ui';

import withStore from '../../../../../common/components/withStore/withStore';

const DetailsCard = React.createClass({
    getFormFieldByName(name) {
        return this.props.data.users.registerForm.fields.filter((item) => {
            return item.name === name;
        }).pop();
    },

    dateChange(e, date) {
        this.onFieldChange({
            target: {
                name: 'birthday',
                value: date
            }
        });
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
        const genderField = this.getFormFieldByName('gender');
        const birthdayField = this.getFormFieldByName('birthday');
        const isEditMode = this.props.data.users.editMode;
        const profile = this.props.data.users.profile;

        return <Paper style={{minHeight: '100%'}}>
            <List>
                <Subheader>Common Details</Subheader>
                {isEditMode ?
                    <RadioButtonGroup className="control-wrapper"
                        name={genderField.name}
                        defaultSelected={genderField.value || 'Male'}
                        onChange={this.onFieldChange}>
                        {genderField.values.map(item => <RadioButton
                            key={item}
                            value={item}
                            label={item}/>)
                        }
                    </RadioButtonGroup>  :
                    <ListItem
                        primaryText={isEditMode ? genderField.value : profile.gender}
                        secondaryText="Gender"
                    />
                }


                {isEditMode ? <div>
                    <Subheader>Birthday Date</Subheader>
                    <DatePicker className="control-wrapper"
                                hintText={birthdayField.label}
                                container="inline"
                                mode="landscape"
                                defaultDate={
                                    (birthdayField.value || profile.birthday) ?
                                        new Date(birthdayField.value || profile.birthday) :
                                        undefined}
                                onChange={this.dateChange}
                    />
                </div>
                    :
                    <ListItem
                        primaryText={isEditMode ? birthdayField.value : profile.birthday}
                        secondaryText="Birthday"
                    />
                }
            </List>
        </Paper>;
    }
});

export default withStore(DetailsCard);
