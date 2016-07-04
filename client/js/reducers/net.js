'use strict';

const netModel = require('models/net');

function net(state = netModel, action) {
    if (action.type === 'startProcessing') {
        let isProcessing = true;
        let err = null;
        return {...state, isProcessing, err};
    }
    if (action.type === 'endProcessing') {
        let isProcessing = false;
        return {...state, isProcessing};
    }
    if (action.type === 'errProcessing') {
        let err = action.err;
        return {...state, err};
    }
    if (action.type === 'abortRequest') {
        let isProcessing = false;
        return {...state, isProcessing};
    }

    if (action.type === 'clearNetErr') {
        let err = '';
        return {...state, err};
    }

    return state;
}

module.exports = net;
