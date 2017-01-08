import React from 'react';
import store from 'store';
export default function (WrappedComponent) {
    return React.createClass({
        getInitialState() {
            return {
                data: store.getState(),
                store: store
            };
        },

        componentWillMount() {
            this.unsubscribe = store.subscribe(this.handleStoreChange);
        },

        componentWillUnmount() {
            this.unsubscribe();
        },

        handleStoreChange() {
            this.setState({ data: this.state.store.getState() });
        },

        render: function() {
            return <WrappedComponent {...this.props} {...this.state} />;
        }
    });
}
