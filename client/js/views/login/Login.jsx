'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import makeFormMixin from 'services/formMakerMixin';
import {loginUser} from 'actions/users';
import store from 'store';
import storeMixin from 'mixins/storeMixin';
import Icon from 'react-fa';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import restApi from 'actions/restApi';

let loginView = React.createClass({
    mixins: [storeMixin],

    login() {
        this.store.dispatch({type: 'loginButtonSubmitClick'});
        this.request = this.store.dispatch(restApi({
            model: 'users',
            action: 'login',
            reducer: 'login'
        }));
    },

    onChangeEditFormField(e) {
        let {name, value} = e.target;
        this.store.dispatch({type: 'changeLoginEditFormField', name, value});
    },

    render() {
        let {net} = store.getState();
        let {editForm} = store.getState().login;
        let inputStyle = {
            width: '100%'
        };
        let form =
            <div className="col-md-6" style={{margin: '50px auto'}}>
                <Card>
                    <CardTitle title="Login" subtitle="Enter your email and password" />
                    <CardText>
                        {editForm.fields.map((field, i) => {
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
                        })
                        }
                    </CardText>
                    <CardActions>
                        {editForm.buttons.map((button, i) =>
                            <RaisedButton
                                key={i}
                                name={button.name}
                                label={button.label}
                                disabled={!editForm.isValid}
                                primary={true}
                                onTouchTap={this.login.bind(this, button.name)}/>
                        )}
                    </CardActions>
                </Card>

            </div>;
        return (
            <div>
                {net.isProcessing ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : form }
            </div>
        );
    }
});

module.exports = loginView;
