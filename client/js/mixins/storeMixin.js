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
        if (this.fetchModel) {
            let fetch = this.fetchModel;
            if (typeof fetch === 'function') {
                fetch = this.fetchModel();
            }
            this.store.dispatch(fetchModel(fetch.name, fetch.params));
        } else {
            this.setState(store.getState());
        }
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
