'use strict';

function register(state = {}, action) {
    if (action.type === 'startFetchingUsersRegister') {
        let isFetching = true;
        return {...state, isFetching};
    }

    if (action.type === 'endFetchingUsersRegister') {
        let isFetching = false;
        window.sessionStorage.token = action.data.token;
        return {...state, isFetching};
    }

    if (action.type === 'errFetchingUsersRegister') {
        let isFetching = false;
        return {...state, isFetching};
    }
    return state;
}

module.exports = register;
