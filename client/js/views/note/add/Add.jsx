'use strict';


import React from 'react';
import {TextField, RaisedButton, Card, CardTitle, CardText, CardActions} from 'material-ui';

import Map from 'components/map/Map';

import restApi from 'actions/restApi';
import Dropzone from 'react-dropzone';

import storeMixin from 'mixins/storeMixin';

let Note = React.createClass({
    formName: 'noteForm',
    mixins: [storeMixin],
    currentMarker: '',

    componentWillMount() {
    },

    onDrop(files) {
        const {formName} = this;
        this.store.dispatch(
            {type: 'onChangeFormFieldNote', name: 'file', value: files[0], formName});
    },

    onChange(e) {
        const {formName} = this;
        const {name, value} = e.target;
        this.store.dispatch({type: 'onChangeFormFieldNote', name, value, formName});
    },

    addCoord(marker) {
        this.onChange({
            target: {
                name: 'position',
                value: {
                    lat: marker.lat,
                    lng: marker.lng
                }
            }
        });
    },

    create() {
        this.store.dispatch({type: 'prepareNotePayload'});
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            action: 'create'
        }));
    },

    render() {
        if (this.state.net.isProcessing) return null;
        const editForm = this.state.notes.noteForm;
        const inputStyle = {
            width: '100%'
        };

        let photo = null, marker = null;

        let infoMarker = editForm.fields.filter((value) => {
            return value.name == 'position';
        })[0];

        if (infoMarker && infoMarker.value.lat) {
            marker = {
                position: {
                    lat: infoMarker.value.lat,
                    lng: infoMarker.value.lng
                }
            };
        }

        return (
            <Card className="addNote">
                <CardTitle title="Add New Note" />
                <CardText>
                    <div>{editForm.fields.map((field, i) => {
                        if (field.type === 'file') {
                            photo = (<div className="register-drop-zone note-zone" key={i}>
                                <Dropzone onDrop={this.onDrop}
                                          className="drop-zone"
                                          activeClassName="active"
                                          accept="image/*">
                                    <strong>Photo:</strong>
                                    <div>Try dropping some files here, or click to select files to upload.</div>
                                    {field.value ? <img src={field.value.preview}/> : null}
                                </Dropzone>
                            </div>);
                        } else if (field.type != 'hidden') {
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
                    }</div>
                    <div className="row add-note-details-block">
                        <div className="col-md-6">
                            {photo}
                        </div>
                        <div className="col-md-6">
                            <Map markers={marker ? [marker] : []} canSetMarker={this.addCoord} />
                        </div>
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
                            onTouchTap={this.create}/>
                    )}
                </CardActions>
            </Card>
        );
    }
});

module.exports = Note;
