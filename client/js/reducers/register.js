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
        case 500:
            if (action.res.body.code) {
                switch (action.res.body.code) {
                case '11000': state.error = 'This email already used'; break;
                default: state.error = 'Unexpected server error';
                }
            }
        }
        window.sessionStorage.token = action.res.body.token;
        return state;
    }
    return state;
}

module.exports = register;
