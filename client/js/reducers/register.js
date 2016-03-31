'use strict';

function register(state = {}, action) {
    if (action.type === 'startFetchingUsersRegister') {
        state.isFetching = true;
        return state;
    }

    if (action.type === 'endFetchingUsersRegister') {
        state.isFetching = false;
        window.sessionStorage.token = action.data.token;
        return state;
    }

    if (action.type === 'errFetchingUsersRegister') {
        state.isFetching = false;
    }
    return state;
}

module.exports = register;
