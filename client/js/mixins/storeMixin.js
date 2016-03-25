'use strict';

let store = require('store');
let fetchModel = require('actions/fetchModel');
let abortRequest = require('actions/abortRequest');

let storeMixin = {
    getInitialState() {
        return {};
    },

    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        this.fetchModel ?
            this.request = this.store.dispatch(fetchModel(this.fetchModel)) :
            this.setState(store.getState());
    },

    componentWillUnmount() {
        this.unsubscribe();
        this.state.net.isFetching && this.store.dispatch(abortRequest(this.request));
    },

    handleStoreChange() {
        this.setState(this.store.getState());
    }
};

module.exports = storeMixin;
