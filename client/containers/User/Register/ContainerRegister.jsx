import React from 'react';
import {TextField, RaisedButton, Paper, RadioButtonGroup, RadioButton, DatePicker} from 'material-ui';

import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';


const Register = React.createClass({
    formName: 'registerForm',

    register(e) {
        e.preventDefault();
        const editForm = this.props.data.users[this.formName];
        if (!editForm.isValid) return;

        this.props.store.dispatch({type: 'prepareUserPayload'});
        this.request = this.props.store.dispatch(restApi({
            model: 'users',
            action: 'create',
            type: 'register'
        }));
    },

    onChange(e) {
        const {formName} = this;
        const {name, value} = e.target;
        this.props.store.dispatch({type: 'onChangeFormField', model: 'users', name, value, formName});
    },

    dateChange(e, date) {
        this.onChange({
            target: {
                name: 'birthday',
                value: date
            }
        });
    },

    getEditField(field) {
        switch (field.type) {
        case 'hidden':  return null;
        case 'radio':  return this.getRadioField(field);
        case 'date':  return this.getDateField(field);
        default: return this.getTextField(field);
        }
    },

    getTextField(field) {
        return <TextField
            key={field.name}
            fullWidth={true}
            name={field.name}
            disabled={field.readOnly}
            type={field.type}
            hintText={field.hintText}
            errorText={field.errorText}
            defaultValue={field.defaultValue}
            onChange={this.onChange}/>;
    },

    getRadioField(field) {
        return <RadioButtonGroup className="control-wrapper"
                                 name={field.name}
                                 key={field.name}
                                 defaultSelected={field.value}
                                 onChange={this.onFieldChange}>
            {field.values.map(item => <RadioButton
                key={item}
                value={item}
                label={item}/>)
            }
        </RadioButtonGroup>;
    },

    getDateField(field) {
        return <div key={field.name}>
            <DatePicker className="control-wrapper"
                        hintText={field.label}
                        fullWidth={true}
                        container="inline"
                        mode="landscape"
                        onChange={this.dateChange}
            />
        </div>;
    },

    getFileField(field) {

    },

    getButton(button) {
        const editForm = this.props.data.users[this.formName];
        return <RaisedButton
            key={button.name}
            primary={true}
            fullWidth={true}
            name={button.name}
            label={button.label}
            disabled={!editForm.isValid}
            onTouchTap={this.register}/>;
    },

    render() {
        const editForm = this.props.data.users[this.formName];
        return <Paper className="login-form">
            <div className="login-header">
                Welcome Back
            </div>
            <form onSubmit={this.register} autoComplete="off" className="login-body" action="/reg">
                <button style={{display: 'none'}}>&nbsp;</button>
                {editForm.fields.map((field, i) => this.getEditField(field))}
                {editForm.buttons.map((button, i) => this.getButton(button))}
            </form>
            <div className="login-footer">
                Already have an account? <a href="#/register">Sign In</a>
            </div>
        </Paper>;
    }
});

export default withStore(Register);
