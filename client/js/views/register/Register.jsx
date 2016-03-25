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
        var data = new FormData();
        data.append('file', this.state.file);
        data.append('email', this.state.email);
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        store.dispatch(registerUser(data));
    },

    onDrop: function (files) {
        this.state.file = files[0];
        this.setState(this.state);
    },

    render() {
        let register = store.getState().register;
        let form =
            <div className="col-md-6" style={{margin: '50px auto'}}>
                <Card>
                    <CardTitle title="Register" subtitle="Creating a new user" />
                    <CardText>
                        <TextField hintText="Username" value={this.state.username} onChange={this.handleUsernameChange}/><br/>
                        <TextField hintText="Email" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                        <TextField hintText="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/><br/>
                        <Dropzone onDrop={this.onDrop} accept="image/*">
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
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
