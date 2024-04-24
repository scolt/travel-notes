import React from 'react';
import {TextField, RaisedButton, Paper} from 'material-ui';

import restApi from '../../../common/actions/restApi';
import withStore from '../../../common/components/withStore/withStore';

import './styl/login.styl';

const Login = React.createClass({
    formName: 'loginForm',

    login(e) {
        e.preventDefault();
        const editForm = this.props.data.users[this.formName];
        if (!editForm.isValid) return;

        this.props.store.dispatch({type: 'preparePayloadForUserLogin'});
        this.request = this.props.store.dispatch(restApi({
            model: 'users',
            action: 'login',
            type: 'login'
        }));
    },

    onChange(e) {
        const {formName} = this;
        const {name, value} = e.target;
        this.props.store.dispatch({type: 'onChangeFormField', model: 'users', name, value, formName});
    },

    render() {
        const editForm = this.props.data.users[this.formName];
        return <Paper className="login-form">
            <div className="login-header">
                Welcome Back
            </div>
            <form onSubmit={this.login} autoComplete="off" className="login-body" action="/asd">
                <button style={{display: 'none'}}>&nbsp;</button>
                {editForm.fields.map((field, i) => {
                    return (<div key={i}>
                        <TextField
                            fullWidth={true}
                            name={field.name}
                            disabled={field.readOnly}
                            type={field.type}
                            hintText={field.hintText}
                            errorText={field.errorText}
                            defaultValue={field.defaultValue}
                            onChange={this.onChange}/><br/></div>);
                })}
                {editForm.buttons.map((button, i) =>
                    <RaisedButton
                        key={i}
                        primary={true}
                        fullWidth={true}
                        name={button.name}
                        label={button.label}
                        disabled={!editForm.isValid}
                        onTouchTap={this.login}/>
                )}
            </form>
            <div className="login-footer">
                Don't have an account? <a href="#/register">Sign Up</a>
            </div>
        </Paper>;
    }
});

export default withStore(Login);
