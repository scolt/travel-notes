import React from 'react';
import {TextField, RaisedButton, Paper, RadioButtonGroup, RadioButton, DatePicker} from 'material-ui';
import Dropzone from 'react-dropzone';

import restApi from '../../../common/actions/restApi';
import withStore from '../../../common/components/withStore/withStore';

import './styl/register.styl';

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

    onDrop(files, name) {
        this.props.store.dispatch({
            type: 'onChangeFormField',
            model: 'users',
            formName: 'registerForm',
            name: name,
            value: files[0]
        });
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
        case 'file':  return this.getFileField(field);
        case 'radio':  return this.getRadioField(field);
        case 'date':  return this.getDateField(field);
        default: return this.getTextField(field);
        }
    },

    getTextField(field) {
        return <TextField
            key={field.name}
            fullWidth={true}
            id={`form-${field.name}`}
            name={field.name}
            disabled={field.readOnly}
            multiLine={field.type === 'textarea'}
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
                id={`radio-item-${field.name}-${item.toLowerCase()}`}
                value={item}
                label={item}/>)
            }
        </RadioButtonGroup>;
    },

    getDateField(field) {
        return <div key={field.name}>
            <DatePicker className="control-wrapper"
                        id={`date-picker-${field.name}`}
                        hintText={field.label}
                        fullWidth={true}
                        container="inline"
                        mode="landscape"
                        onChange={this.dateChange}
            />
        </div>;
    },

    getFileField(field) {
        return <Dropzone id={`${field.name}DropzoneContainer`}
                         key={field.name} onDrop={files => this.onDrop(files, field.name)}
                         className="drop-zone register-field"
                         activeClassName="active"
                         accept="image/*">
            {field.value.preview ? <img src={field.value.preview} alt={field.name}/> : <span>{field.dropzoneText}</span>}
        </Dropzone>;
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
            <div className="logout-footer">
                Already have an account? <a href="#/login">Sign In</a>
            </div>
        </Paper>;
    }
});

export default withStore(Register);
