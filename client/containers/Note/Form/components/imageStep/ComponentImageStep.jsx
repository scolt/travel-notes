import React from 'react';
import {RaisedButton, FlatButton} from 'material-ui';
import Dropzone from 'react-dropzone';

import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';
import withSteps from '../withSteps';

import './add-image-step.styl';

const ImageStep = React.createClass({
    onDrop(files) {
        this.props.store.dispatch({
            type: 'onChangeFormField',
            model: 'notes',
            formName: 'noteForm',
            name: 'file',
            value: files[0]
        });
    },

    onFieldChange(e) {
        const {name, value} = e.target;
        this.props.store.dispatch({
            type: 'onChangeFormField',
            model: 'notes',
            formName: 'noteForm',
            name,
            value
        });
    },

    saveNote() {
        this.props.store.dispatch({
            type: 'prepareNotePayload'
        });
        this.props.store.dispatch(restApi({
            model: 'notes',
            action: 'create',
            type: 'createNote'
        }));
    },

    render() {
        const editForm = this.props.data.notes.noteForm;
        const isStepValid = this.props.data.notes.noteForm.groupValidations['step4'];
        const previousStep = this.props.step - 1;
        return <div className="add-note-image-step">
            <p>You can setup first photo right now or do it after in edit mode.
                Also you will able add more than one photo in edit mode :)</p>
            <div>{editForm.fields.map((field, i) => {
                if (field.type != 'hidden' && ['file'].includes(field.name)) {
                    return (<div key={i}>
                        <Dropzone onDrop={this.onDrop}
                                  className="drop-zone"
                                  activeClassName="active"
                                  accept="image/*">
                            <strong className="title">First photo:</strong>
                            <div className="instruction">Try dropping some files here, or click to select files to upload.</div>
                            {field.value ? <img src={field.value.preview}/> : null}
                        </Dropzone>
                    </div>);
                }
            })}</div>

            <div className="step-actions">
                <FlatButton
                    label="Back"
                    onTouchTap={this.props.handleStepClick.bind(this, previousStep)}
                    style={{marginRight: 12}}
                />
                <RaisedButton
                    disabled={!isStepValid}
                    label="Finish and save!"
                    primary={true}
                    onTouchTap={this.saveNote}
                />
            </div>
        </div>;
    }
});

export default withStore(withSteps(ImageStep));
