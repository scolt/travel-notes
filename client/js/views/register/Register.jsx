'use strict';

import './Register.styl';

import React from 'react';
import Icon from 'react-fa';
import Dropzone from 'react-dropzone';
import {TextField, RaisedButton, Card, CardActions, CardText, CardTitle} from 'material-ui/lib';

import storeMixin from 'mixins/storeMixin';

import restApi from 'actions/restApi';

let RegisterView = React.createClass({
    formName: 'registerForm',

    mixins: [
        storeMixin
    ],

    register() {
        this.store.dispatch({type: 'preparePayloadForUserCreate'});
        this.request = this.store.dispatch(restApi({
            model: 'users',
            action: 'create',
            type: 'createUser'
        }));
    },

    onDrop(files) {
        const {formName} = this;
        this.store.dispatch({type: 'onChangeFormField', name: 'file', value: files[0], formName});
    },

    onChange(e) {
        const {formName} = this;
        const {name, value} = e.target;
        this.store.dispatch({type: 'onChangeFormField', name, value, formName});
    },

    render() {
        const editForm = this.state.users.registerForm;
        const inputStyle = {
            width: '100%'
        };

        const form =
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
                                            onChange={this.onChange}/><br/></div>);
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
                                onTouchTap={this.register}/>
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
