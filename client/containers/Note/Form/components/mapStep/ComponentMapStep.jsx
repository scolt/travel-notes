import React from 'react';
import {RaisedButton, FlatButton} from 'material-ui';

import Map from 'common/components/map/Map';
import withStore from 'common/components/withStore/withStore';
import withSteps from '../withSteps';

const MapStep = React.createClass({
    changeCoordinate(marker) {
        this.props.store.dispatch({
            type: 'onChangeFormField',
            model: 'notes',
            formName: 'noteForm',
            name: 'position',
            value: {...marker}
        });
    },

    render() {
        const position = this.props.data.notes.noteForm.fields.filter((item) => {
            return item.name === 'position';
        }).pop().value;

        const isStepValid = this.props.data.notes.noteForm.groupValidations['step3'];
        const prevStep = this.props.step - 1;
        const nextStep = this.props.step + 1;

        return <div className="edit-enabled">
            <Map className="map-in-card"
                 markers={isStepValid ? [{position: position}] : []}
                 canSetMarker={this.changeCoordinate}
                 canOpenMarker={false}/>

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

export default withStore(withSteps(MapStep));
