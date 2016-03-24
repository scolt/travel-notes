'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import makeFormMixin from 'services/formMakerMixin';
import registerUser from 'actions/registerUser';
import store from 'store';
import Icon from 'react-fa';
import SweetAlert from 'sweetalert-react';
import 'sweetalert-react/node_modules/sweetalert/dist/sweetalert.css';

let formMixin = makeFormMixin([
    'username',
    'email',
    'password'
]);

let RegisterView = React.createClass({
    mixins: [formMixin],

    componentWillMount() {
        this.unSubscribe = store.subscribe(this.onChangeStore);
    },

    componentWillUnMount() {
        this.unSubscribe();
    },

    onChangeStore() {
        this.setState(this.state);
    },

    register() {
        store.dispatch(registerUser(this.state));
    },
    render() {
        let register = store.getState().register;
        let form =
            <div>
                <TextField hintText="Username" value={this.state.username} onChange={this.handleUsernameChange}/><br/>
                <TextField hintText="Email" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                <TextField hintText="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/><br/>
                <RaisedButton
                    label="Register"
                    onTouchTap={this.register}
                /><br/><br/>
            </div>;
        return (
            <div>
                {register.isFetching ? <div className="spinner"><Icon name="spinner" spin/></div> : form }
                <SweetAlert
                    show={register.success}
                    title="Demo"
                    text="SweetAlert in React"
                    type="success"
                    onConfirm={() => {register.success = false; this.setState(this.state);}}
                />
                <SweetAlert
                    show={!!register.error}
                    title="Demo"
                    text={register.error}
                    type="error"
                    onConfirm={() => {register.error = ''; this.setState(this.state);}}
                />
            </div>
        );
    }
});

module.exports = RegisterView;
