'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import makeFormMixin from 'services/formMakerMixin';
import {registerUser} from 'actions/users';
import store from 'store';
import Icon from 'react-fa';
import SweetAlert from 'sweetalert-react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Dropzone from 'react-dropzone';
import 'sweetalert/dist/sweetalert.css';
import './Register.styl';

let formMixin = makeFormMixin([
    {
        name: 'username',
        rules: ['required', /^[A-z0-9]+$/]
    },
    {
        name: 'email',
        rules: ['required', {
            rule: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
            message: 'Email is incorrect please check that @ and domain are provided.'
        }]
    },
    {
        name: 'password',
        rules: ['required', {
            rule: /^[a-z0-9]+$/,
            message: 'Password should contains only letter and numbers'
        }]
    }
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
        let invalidForm = this.validateForm();
        if (invalidForm) {
            this.setState(this.state);
        } else {
            var data = new FormData();
            data.append('file', this.state.file);
            data.append('email', this.state.email);
            data.append('username', this.state.username);
            data.append('password', this.state.password);
            store.dispatch(registerUser(data));
        }
    },

    onDrop(files) {
        this.state.file = files[0];
        this.setState(this.state);
    },

    success() {
        let register = store.getState().register;
        register.success = '';
        this.setState(this.state);
        location.hash = '#/';
    },

    render() {
        let register = store.getState().register;
        let inputStyle = {
            width: '100%'
        };
        let form =
            <div className="col-md-6" style={{margin: '50px auto'}}>
                <Card>
                    <CardTitle title="Register" subtitle="Creating a new user" />
                    <CardText className="row">
                        <div className="col-md-6 col-sm-8 col-xs-12">
                            <TextField hintText="Username"
                                       style={inputStyle}
                                       value={this.state.username}
                                       onChange={this.handleUsernameChange}
                                       errorText={this.state.errors.username}/><br/>
                            <TextField hintText="Email"
                                       style={inputStyle}
                                       value={this.state.email}
                                       onChange={this.handleEmailChange}
                                       errorText={this.state.errors.email}/><br/>
                            <TextField hintText="Password" type="password"
                                       style={inputStyle}
                                       value={this.state.password}
                                       onChange={this.handlePasswordChange}
                                       errorText={this.state.errors.password}/><br/>
                        </div>
                        <div className="col-md-6 col-sm-4 col-xs-12 register-drop-zone">
                            <Dropzone onDrop={this.onDrop}
                                      className="drop-zone"
                                      activeClassName="active"
                                      accept="image/*">
                                <strong>Avatar:</strong>
                                <div>Try dropping some files here, or click to select files to upload.</div>
                                {this.state.file ? <img src={this.state.file.preview} /> : null}
                            </Dropzone>

                        </div>

                    </CardText>
                    <CardActions>
                        <RaisedButton
                            label="Register"
                            primary={true}
                            onTouchTap={this.register}
                        />
                    </CardActions>
                </Card>
            </div>;
        return (
            <div>
                {register.isFetching ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : form }
                <SweetAlert
                    show={register.success}
                    title="Register"
                    text="You are successful registered and logged in. Press OK for redirect to home page."
                    type="success"
                    onConfirm={this.success}
                />
                <SweetAlert
                    show={!!register.error}
                    title="Error"
                    text={register.error}
                    type="error"
                    onConfirm={() => {register.error = ''; this.setState(this.state);}}
                />
            </div>
        );
    }
});

module.exports = RegisterView;
