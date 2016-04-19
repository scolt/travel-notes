'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import storeMixin from 'mixins/storeMixin';
import {registerUser} from 'actions/users';
import store from 'store';
import Icon from 'react-fa';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Dropzone from 'react-dropzone';
import './Register.styl';
import restApi from 'actions/restApi';

//let formMixin = makeFormMixin([
//    {
//        name: 'username',
//        rules: ['required', /^[A-z0-9]+$/]
//    },
//    {
//        name: 'email',
//        rules: ['required', {
//            rule: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
//            message: 'Email is incorrect please check that @ and domain are provided.'
//        }]
//    },
//    {
//        name: 'password',
//        rules: ['required', {
//            rule: /^[a-z0-9]+$/,
//            message: 'Password should contains only letter and numbers'
//        }]
//    }
//]);

let RegisterView = React.createClass({
    mixins: [
        storeMixin
    ],

    register() {
        this.store.dispatch({type: 'registerButtonClick'});
        this.request = this.store.dispatch(restApi({
            model: 'users',
            action: 'register',
            reducer: 'register'
        }));
    },

    onDrop(files) {
        this.store.dispatch({type: 'changeRegisterEditFormField', name: 'file', value: files[0]});
    },

    success() {
        let register = store.getState().register;
        register.success = '';
        this.setState(this.state);
        location.hash = '#/';
    },

    onChangeEditFormField(e) {
        let {name, value} = e.target;
        this.store.dispatch({type: 'changeRegisterEditFormField', name, value});
    },

    onBlurEditFormField(e) {
        let {name, value} = e.target;
        this.store.dispatch({type: 'blurRegisterEditFormField', name, value});
    },

    render() {
        let register = store.getState().register;
        let editForm = store.getState().register.editForm;
        let inputStyle = {
            width: '100%'
        };

        let form =
            <div className="col-md-6" style={{margin: '50px auto'}}>
                <Card>
                    <CardTitle title="Register" subtitle="Creating a new user"/>
                    <CardText className="row">
                        <div className="col-xs-12">
                            {editForm.fields.map((field, i) => {

                                if (field.type === 'file') {
                                    return (<div className="register-drop-zone">
                                        <Dropzone onDrop={this.onDrop}
                                                  className="drop-zone"
                                                  activeClassName="active"
                                                  accept="image/*">
                                            <strong>Avatar:</strong>
                                            <div>Try dropping some files here, or click to select files to upload.</div>
                                            {field.value ? <img src={field.value.preview}/> : null}
                                        </Dropzone>
                                    </div>);
                                } else {
                                    return (<div key={i}>
                                        <TextField
                                            name={field.name}
                                            style={inputStyle}
                                            disabled={field.readOnly}
                                            hintText={field.hintText}
                                            errorText={field.errorText}
                                            defaultValue={field.defaultValue}
                                            onChange={this.onChangeEditFormField}
                                            onBlur={this.onBlurEditFormField}/><br/></div>);
                                }
                            })
                            }
                        </div>

                    </CardText>
                    <CardActions>
                        {editForm.buttons.map((button, i) =>
                            <RaisedButton
                                key={i}
                                name={button.name}
                                label={button.label}
                                primary={true}
                                onTouchTap={this.register.bind(this, button.name)}/>
                        )}
                    </CardActions>
                </Card>
            </div>;
        return (
            <div>
                {register.isFetching ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : form }
            </div>
        );
    }
});

module.exports = RegisterView;
