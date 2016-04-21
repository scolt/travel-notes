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

let RegisterView = React.createClass({
    mixins: [
        storeMixin
    ],

    register() {
        this.store.dispatch({type: 'registerButtonSubmitClick'});
        this.request = this.store.dispatch(restApi({
            model: 'users',
            action: 'create',
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

    render() {
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
                                    return (<div className="register-drop-zone" key={i}>
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
                                            type={field.type}
                                            hintText={field.hintText}
                                            errorText={field.errorText}
                                            defaultValue={field.defaultValue}
                                            onChange={this.onChangeEditFormField}/><br/></div>);
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
                                disabled={!editForm.isValid}
                                primary={true}
                                onTouchTap={this.register.bind(this, button.name)}/>
                        )}
                    </CardActions>
                </Card>
            </div>;

        return (
            <div>
                {form}
            </div>
        );
    }
});

module.exports = RegisterView;
