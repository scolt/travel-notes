'use strict';

const userModel = require('models/user');

function user(state = userModel, action) {
    if (action.type === 'endProcessing' && action.data.reducer === 'register') {
        return {...action.data.body};
    }

    if (action.type === 'endProcessing' && action.data.reducer === 'login') {
        return {...action.data.body};
    }

    if (action.type === 'endProcessing' &&
        action.data.reducer === 'user' &&
        action.data.action === 'ping') {
        return {...action.data.body};
    }

    if (action.type === 'logout') {
        window.sessionStorage.token = null;
        return {...userModel};
    }

    return state;
}

module.exports = user;
