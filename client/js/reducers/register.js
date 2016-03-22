'use strict';

const registerModel = require('models/register');

function register(state = registerModel, action) {
    if (action.type === 'startFetchingRegister') {
        state.isFetching = true;
        return state;
    }
    if (action.type === 'endFetchingRegister') {
        state.isFetching = false;
        switch (action.res.statusCode) {
        case 200: state.success = true; break;
        }
        window.sessionStorage.token = action.res.body.token;
        return state;
    }
    return state;
}

module.exports = register;
