import React from 'react';
export default function (WrappedComponent) {
    return React.createClass({
        getInitialState() {
            return {
                handleStepClick: stepIndex => {
                    this.props.store.dispatch({
                        type: 'changeAddActiveStep',
                        stepIndex: stepIndex
                    });
                }
            };
        },

        render: function() {
            return <WrappedComponent {...this.props} {...this.state} />;
        }
    });
}
