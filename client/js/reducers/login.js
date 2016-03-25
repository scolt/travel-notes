'use strict';

const loginModel = require('models/login');

function login(state = loginModel, action) {
    if (action.type === 'startFetchingLogin') {
        state.isFetching = true;
        return state;
    }
    if (action.type === 'endFetchingLogin') {
        state.isFetching = false;
        switch (action.res.statusCode) {
        case 200: state.success = true; break;
        case 500:
            if (action.res.body.code) {
                switch (action.res.body.code) {
                case '11000': state.error = 'This email already used'; break;
                default: state.error = 'Unexpected server error';
                }
            } else {
                state.error = action.res.text;
            }
            break;
        case 401: state.error = 'hmhm';
        }

        window.sessionStorage.token = action.res.body && action.res.body.token;
        return state;
    }
    return state;
}

module.exports = login;
