'use strict';

let store = require('store');
let abortRequest = require('actions/abortRequest');

let storeMixin = {
    getInitialState() {
        return {};
    },

    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        this.setState(store.getState(), this.afterComponentWillMount && this.afterComponentWillMount());
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
