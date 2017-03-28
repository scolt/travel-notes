import React from 'react';
import {RaisedButton, TextField} from 'material-ui';

import withStore from 'common/components/withStore/withStore';

import withSteps from '../withSteps';

const TitleStep = React.createClass({
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

    render() {
        const editForm = this.props.data.notes.noteForm;
        const isStepValid = this.props.data.notes.noteForm.groupValidations['step1'];
        const nextStep = this.props.step + 1;

        return <div>
            <p>Provide title of your note. It can be name of city or place.</p>
            <p>Provide subtitle of your note. It can be a short phrase or slogan about you impression. You can leave this field empty.</p>

            <div>{editForm.fields.map((field, i) => {
                if (field.type != 'hidden' && ['title', 'subtitle'].includes(field.name)) {
                    return (<div key={i}>
                        <TextField
                            name={field.name}
                            fullWidth={true}
                            disabled={field.readOnly}
                            type={field.type}
                            hintText={field.hintText}
                            errorText={field.errorText}
                            defaultValue={field.value || field.defaultValue}
                            onChange={this.onFieldChange}/><br/></div>);
                }
            })}</div>

            <div className="step-actions">
                <RaisedButton
                    id="nextButton"
                    label="Next"
                    primary={true}
                    disabled={!isStepValid}
                    onTouchTap={this.props.handleStepClick.bind(this, nextStep)}
                />
            </div>
        </div>;
    }
});

export default withStore(withSteps(TitleStep));
