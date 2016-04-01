'use strict';

const sweetalertModel = require('models/sweetalert');

function sweetalert(state = sweetalertModel, action) {
    if (action.type === 'errFetchingUsersLogin') {
        let open = true;
        let title = action.err.message;
        let message = 'Unexpected error, please try again';

        let type = 'error';
        if (action.err.status == 401) {
            message = 'Username or password is invalid';
        }
        return {...state, open, title, message, type};
    }

    if (action.type === 'errFetchingUsersRegister') {
        let open = true;
        let title = action.err.message;
        let message = 'Unexpected error, please try again';
        let type = 'error';
        if (action.err.status == 401) {
            title = 'This email exists';
            message = 'This email already registered in the application.';
        }
        return {...state, open, title, message, type};
    }

    if (action.type === 'endFetchingUsersRegister') {
        let open = true;
        let title = 'Registered!';
        let message = 'You are successful registered and logged in application.';
        let type = 'success';
        let redirectTo = '/#/home';
        return {...state, open, title, message, type, redirectTo};
    }

    if (action.type === 'alertClose') {
        let open = false;
        let redirectTo = null;

        if (state.redirectTo) {
            window.location.hash = state.redirectTo;
        }
        return {...state, open, redirectTo};
    }

    return state;
}

module.exports = sweetalert;
