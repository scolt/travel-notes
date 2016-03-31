'use strict';

const netModel = require('models/net');

function net(state = netModel, action) {
    if (action.type.indexOf('startFetching') === 0) {
        let isFetching = true;
        let err = null;
        return {...state, isFetching, err};
    }
    if (action.type.indexOf('endFetching') === 0) {
        let isFetching = false;
        return {...state, isFetching};
    }
    if (action.type.indexOf('errFetching') === 0) {
        let isFetching = false;
        let err = action.err;
        return {...state, isFetching, err};
    }
    if (action.type === 'abortRequest') {
        let isFetching = false;
        return {...state, isFetching};
    }

    if (action.type === 'clearNetErr') {
        let err = '';
        return {...state, err};
    }

    return state;
}

module.exports = net;
