'use strict';

let store = require('store');

let storeMixin = {
    getInitialState() {
        return {};
    },
    
    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        this.setState(store.getState());
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    handleStoreChange() {
        let state = this.store.getState();
        this.setState(state);
    }
};

module.exports = storeMixin;
