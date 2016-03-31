'use strict';

const snackbarModel = require('models/snackbar');

function snackbar(state = snackbarModel, action) {
    if (action.type === 'endFetchingUsersLogin') {
        state.open = true;
        state.message = 'You are successful logged in';
    }

    if (action.type === 'endFetchingUsersUpdate') {
        state.open = true;
        state.message = 'User details successful updated';
    }

    if (action.type === 'snackbarClose') {
        state.open = false;
        state.message = '';
    }
    return state;
}

module.exports = snackbar;
