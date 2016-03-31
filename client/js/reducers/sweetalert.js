'use strict';

const sweetalertModel = require('models/sweetalert');

function sweetalert(state = sweetalertModel, action) {
    if (action.type === 'errFetchingUsersLogin') {
        state.open = true;
        state.title = action.err.message;
        state.message = 'Unexpected error, please try again';
        if (action.err.status == 401) {
            state.message = 'Username or password is invalid';
        }
        state.type = 'error';
    }

    if (action.type === 'errFetchingUsersRegister') {
        state.open = true;
        state.title = action.err.message;
        state.message = 'Unexpected error, please try again';
        state.type = 'error';
        if (action.data && action.data.code === '11000') {
            state.title = 'This email exists';
            state.message = 'This email already registered in the application.';
        }
    }

    if (action.type === 'endFetchingUsersRegister') {
        state.open = true;
        state.title = 'Registered!';
        state.message = 'You are successful registered and logged in application.';
        state.type = 'success';
        state.redirectTo = '/#/home';
    }

    if (action.type === 'alertClose') {
        state.open = false;
        if (state.redirectTo) {
            window.location.hash = state.redirectTo;
        }
        state.redirectTo = null;
    }

    return state;
}

module.exports = sweetalert;
