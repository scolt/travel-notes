'use strict';

import React from 'react';
import store from 'store';
import Editable from 'components/editableField/editableField';
import storeMixin from 'mixins/storeMixin';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import makeFormMixin from 'services/formMakerMixin';
import Paper from 'material-ui/lib/paper';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Icon from 'react-fa';
import './../profile.styl';

import fetchModel from 'actions/restApi';

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
    }
]);

let MapPage = React.createClass({
    mixins: [
        storeMixin,
        formMixin
    ],

    fetchModel: function () {
        return {
            name: 'users',
            params: {
                data: {
                    userId: this.props.user
                }
            }
        };
    },

    enableEditMode: function () {
        let defaultState = this.getInitValue();
        store.dispatch({type: 'setEnableProfileMode', value: true});
        this.setState(defaultState);
    },

    disableEditMode: function () {
        let defaultState = this.getInitValue();
        store.dispatch({type: 'setEnableProfileMode', value: false});
        this.setState(defaultState);
    },

    getInitValue: function () {
        let defaultState = {};
        let user = store.getState().profile;
        Object.keys(user).forEach(function(key, index) {
            defaultState[key] = user[key];
        }, this);
        return defaultState;
    },

    saveFields: function () {
        let invalidForm = this.validateForm();
        if (invalidForm) {
            this.setState(this.state);
        } else {
            let user = store.getState().profile;
            var data = new FormData();
            data.append('_id', user['_id']);
            data.append('email', this.state.email);
            data.append('username', this.state.username);
            store.dispatch(fetchModel('users', {
                action: 'update',
                data: data
            }));
        }
    },

    render() {
        let user = store.getState().profile;
        let editBlock = null;

        if (user.owner) {
            let editButton =
                <FloatingActionButton mini={true} secondary={true} onTouchTap={this.enableEditMode}>
                    <Icon name="pencil"/>
                </FloatingActionButton>;
            let actionButtons =
                <div>
                    <FloatingActionButton mini={true} secondary={true} style={{marginRight: '10px'}}
                                          onTouchTap={this.saveFields}>
                        <Icon name="floppy-o"/>
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} primary={true} onTouchTap={this.disableEditMode}>
                        <Icon name="times"/>
                    </FloatingActionButton>
                </div>;

            editBlock =
                <div className="user-profile-edit">
                    {user.enableEditMode ? actionButtons : editButton}
                </div>;
        }

        let profile =
            <Card>
                <CardTitle
                    title="User profile"
                    subtitle={user.owner ? 'This is You :)' : ''}
                    className="user-profile-header"
                    style={{paddingRight: '70px'}}
                    children={editBlock}
                >
                </CardTitle>
                <CardText className="row">
                    <div className="col-md-6">
                        <Paper className="image-developer"
                               zDepth={1}
                               circle={true}>
                            <img className="img-rounded" src={user.avatar}/>
                        </Paper>
                    </div>
                    <div className="col-md-6">
                        <Editable editMode={user.enableEditMode}
                                  value={this.state.username || user.username}
                                  hintText="Username"
                                  name="username"
                                  onChange={this.handleUsernameChange}
                                  errorText={this.state.errors.username}
                        />
                        <Editable editMode={user.enableEditMode}
                                  value={this.state.email || user.email}
                                  hintText="Email"
                                  name="email"
                                  onChange={this.handleEmailChange}
                                  errorText={this.state.errors.email}
                        />
                    </div>
                </CardText>
            </Card>;
        return (
            <div>
                {user.isFetching ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : profile}
            </div>
        );
    }
});

module.exports = MapPage;
