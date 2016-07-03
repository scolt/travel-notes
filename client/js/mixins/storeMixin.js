'use strict';

let store = require('store');
let abortRequest = require('actions/abortRequest');

let storeMixin = {
    getInitialState() {
        return store.getState();
    },

    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
    },

    componentWillUnmount() {
        this.unsubscribe();
        this.state.net.isProcessing && this.store.dispatch(abortRequest(this.request));
    },

    handleStoreChange() {
        this.setState(this.store.getState());
    }
};

module.exports = storeMixin;
