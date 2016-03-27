'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import makeFormMixin from 'services/formMakerMixin';
import {loginUser} from 'actions/users';
import store from 'store';
import Icon from 'react-fa';
import SweetAlert from 'sweetalert-react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import 'sweetalert/dist/sweetalert.css';

let formMixin = makeFormMixin([
    {
        name: 'email',
        rules: ['required']
    },
    {
        name: 'password',
        rules: ['required']
    }
]);

let loginView = React.createClass({
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

    login() {
        let invalidForm = this.validateForm();
        if (invalidForm) {
            this.setState(this.state);
        } else {
            store.dispatch(loginUser(this.state));
        }
    },
    render() {
        let login = store.getState().login;
        let form =
            <div className="col-md-6" style={{margin: '50px auto'}}>
                <Card>
                    <CardTitle title="Login" subtitle="Enter your email and password" />
                    <CardText>
                        <TextField hintText="Email"
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.handleEmailChange}
                                   errorText={this.state.errors.email}/><br/>
                        <TextField hintText="Password" type="password"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.handlePasswordChange}
                                   errorText={this.state.errors.password}/><br/>
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            label="Login"
                            primary={true}
                            onTouchTap={this.login}
                        />
                    </CardActions>
                </Card>

            </div>;
        return (
            <div>
                {login.isFetching ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : form }
                <SweetAlert
                    show={!!login.error}
                    title="Demo"
                    text={login.error}
                    type="error"
                    onConfirm={() => {login.error = ''; this.setState(this.state);}}
                />
            </div>
        );
    }
});

module.exports = loginView;
