'use strict';
import store from 'store';

function login(state = {}, action) {
    if (action.type === 'startFetchingUsersLogin') {
        return state;
    }

    if (action.type === 'endFetchingUsersLogin') {
        window.sessionStorage.token = action.data && action.data.token;
        location.href = '/#';
        return state;
    }

    return state;
}

module.exports = login;
