import React from 'react';
import {RaisedButton, TextField, FlatButton} from 'material-ui';

import withStore from '../../../../../common/components/withStore/withStore';
import withSteps from '../withSteps';

const TextStep = React.createClass({
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
        const isStepValid = this.props.data.notes.noteForm.groupValidations['step2'];
        const prevStep = this.props.step - 1;
        const nextStep = this.props.step + 1;
        return <div>
            <p>Provide short or long description of your impression and place which you attend.
                You can share everything with our guests.
                You can use markdown syntax for advanced users
                (see link&nbsp;
                <a href="https://guides.github.com/features/mastering-markdown/">markdown guide</a>
                )</p>
            <div>{editForm.fields.map((field, i) => {
                if (field.type != 'hidden' && ['text'].includes(field.name)) {
                    return (<div key={i}>
                        <TextField
                            name={field.name}
                            fullWidth={true}
                            disabled={field.readOnly}
                            type={field.type}
                            multiLine={true}
                            rows={8}
                            hintText={field.hintText}
                            errorText={field.errorText}
                            defaultValue={field.value || field.defaultValue}
                            onChange={this.onFieldChange}/><br/></div>);
                }
            })}</div>

            <div className="step-actions">
                <FlatButton
                    id="backButton"
                    label="Back"
                    onTouchTap={this.props.handleStepClick.bind(this, prevStep)}
                    style={{marginRight: 12}}
                />
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

export default withStore(withSteps(TextStep));
