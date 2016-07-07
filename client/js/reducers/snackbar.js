'use strict';

const snackbarModel = require('models/snack');

function snackbar(state = snackbarModel, action) {
    if (action.type === 'login') {
        let open = true;
        let message = 'You are successful logged in';
        return {...state, open, message};
    }

    if (action.type === 'logout') {
        let open = true;
        let message = 'You are successful logged out';
        return {...state, open, message};
    }

    if (action.type === 'endFetchingUsersUpdate') {
        let open = true;
        let message = 'User details successful updated';
        return {...state, open, message};
    }

    if (action.type === 'snackbarClose') {
        let open = false;
        let message = '';
        return {...state, open, message};
    }
    return state;
}

module.exports = snackbar;
