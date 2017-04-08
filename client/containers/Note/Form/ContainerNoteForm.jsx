import React from 'react';
import Icon from 'react-fa';
import {Stepper, Step, StepLabel, StepContent} from 'material-ui';

import withStore from 'common/components/withStore/withStore';

import TitleStep from './components/titleStep/ComponentTitleStep';
import TextStep from './components/textStep/ComponentTextStep';
import MapStep from './components/mapStep/ComponentMapStep';
import ImageStep from './components/imageStep/ComponentImageStep.jsx';
import deviceDetector from 'common/services/deviceDetector';

import './styl/noteForm.styl';
const NoteAdd = React.createClass({
    componentWillMount() {
        const isAuthorized = !!this.props.data.users.user.username;
        if (!isAuthorized) {
            this.props.store.dispatch({
                type: 'createNoteDenied',
                path: '#/note/create'
            });
        }
    },

    renderStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return <TitleStep step={0}/>;
        case 1:
            return <TextStep step={1}/>;
        case 2:
            return <MapStep step={2}/>;
        case 3:
            return <ImageStep step={3}/>;
        }
    },

    render() {
        const isLoading = this.props.data.notes.isProcessing;
        const stepIndex = this.props.data.notes.noteForm.currentStep;
        const isTablet = deviceDetector.isTablet();
        const card = <div>
            <div className="stepper-bar">
                <Stepper activeStep={stepIndex} orientation={isTablet ? 'vertical' : 'horizontal'}>
                    <Step>
                        <StepLabel>
                            Set title and subtitle
                        </StepLabel>
                        {isTablet ? <StepContent className="step-content">
                            {this.renderStepContent(0)}</StepContent> :
                            <span></span>
                        }
                    </Step>
                    <Step>
                        <StepLabel>
                            Provide short or long description
                        </StepLabel>
                        {isTablet ? <StepContent className="step-content">
                            {this.renderStepContent(1)}</StepContent> :
                            <span></span>
                        }
                    </Step>
                    <Step>
                        <StepLabel>
                            Set map position
                        </StepLabel>
                        {isTablet ? <StepContent className="step-content">
                            {this.renderStepContent(2)}</StepContent> :
                            <span></span>
                        }
                    </Step>
                    <Step>
                        <StepLabel>
                            Upload one beautiful photo
                        </StepLabel>
                        {isTablet ? <StepContent className="step-content">
                            {this.renderStepContent(3)}</StepContent> :
                            <span></span>
                        }
                    </Step>
                </Stepper>
            </div>

            <div className="step-content">
                {!isTablet ? this.renderStepContent(stepIndex) : null}
            </div>
        </div>;

        return <div>
            {isLoading ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : card}
        </div>;
    }
});

export default withStore(NoteAdd);
