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
import restApi from 'actions/restApi';


let MapPage = React.createClass({
    mixins: [
        storeMixin
    ],

    afterComponentWillMount() {
        this.request = this.store.dispatch(restApi({
            model: 'users',
            action: 'read',
            reducer: 'profile',
            params: {
                userId: this.props.user
            }
        }));
    },

    onChangeEditFormField(e) {
        let {name, value} = e.target;
        this.store.dispatch({type: 'changeProfileEditFormField', name, value});
    },

    enableEditMode: function () {
        store.dispatch({type: 'setEnableProfileMode', value: true});
    },

    cancelEditMode: function () {
        store.dispatch({type: 'cancelEditMode'});
    },

    saveFields: function () {
        store.dispatch(restApi({
            model: 'users',
            action: 'update',
            reducer: 'profile'
        }));
    },

    render() {
        let user = store.getState().profile.row;
        let editForm = store.getState().profile.editForm;
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
