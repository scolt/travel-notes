'use strict';

import './../profile.styl';

import React from 'react';
import Icon from 'react-fa';
import {Card, CardTitle, CardText, Paper, FloatingActionButton} from 'material-ui/lib';

import Editable from 'components/editableField/editableField';
import storeMixin from 'mixins/storeMixin';
import restApi from 'actions/restApi';

let MapPage = React.createClass({
    formName: 'editForm',
    mixins: [
        storeMixin
    ],

    componentWillMount() {
        this.store.dispatch({type: 'preparePayloadForUserProfile', id: this.props.user});
        this.request = this.store.dispatch(restApi({
            model: 'users',
            id: this.props.user,
            type: 'prepareUser'
        }));
    },

    onChangeEditFormField(e) {
        const {formName} = this;
        let {name, value} = e.target;
        this.store.dispatch({type: 'onChangeFormField', name, value, formName});
    },

    enableEditMode: function () {
        this.store.dispatch({type: 'setEnableProfileMode', value: true});
    },

    cancelEditMode: function () {
        this.store.dispatch({type: 'cancelEditMode'});
    },

    saveFields: function () {
        this.store.dispatch({type: 'preparePayloadForUserUpdate'});
        this.store.dispatch(restApi({
            model: 'users',
            action: 'update',
            type: 'prepareUser'
        }));
    },

    render() {
        const {user, editForm} = this.state.users;

        let editBlock = null;

        if (user.owner) {
            let editButton =
                <FloatingActionButton mini={true} secondary={true} onTouchTap={this.enableEditMode}>
                    <Icon name="pencil"/>
                </FloatingActionButton>;
            let actionButtons =
                <div>
                    <FloatingActionButton mini={true} secondary={true} style={{marginRight: '10px'}}
                                          disabled={!editForm.isValid}
                                          onTouchTap={this.saveFields}>
                        <Icon name="floppy-o"/>
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} primary={true} onTouchTap={this.cancelEditMode}>
                        <Icon name="times"/>
                    </FloatingActionButton>
                </div>;

            editBlock =
                <div className="user-profile-edit">
                    {editForm.enableEditMode ? actionButtons : editButton}
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
                        {editForm.fields.map((field, i) => {
                            return (<div key={i}>
                                <Editable
                                    editMode={editForm.enableEditMode}
                                    name={field.name}
                                    value={field.value}
                                    disabled={field.readOnly}
                                    type={field.type}
                                    hintText={field.hintText}
                                    errorText={field.errorText}
                                    defaultValue={field.defaultValue}
                                    onChange={this.onChangeEditFormField}/><br/></div>);
                        })
                        }
                    </div>
                </CardText>
            </Card>;
        return (
            <div>
                {profile}
            </div>
        );
    }
});

module.exports = MapPage;
