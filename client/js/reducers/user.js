'use strict';

const userModel = require('models/user');

function user(state = userModel, action) {
    let successfulTypes = ['endFetchingUsersPing', 'endFetchingUsersLogin', 'endFetchingUsersRegister', 'endFetchingUsersUpdate'];

    if (successfulTypes.indexOf(action.type) > -1) {
        if (action.statusCode === 200) {
            state.email = action.data.email;
            state.avatar = action.data.avatar;
            state.username = action.data.username;
        }
        state.isFetching = false;
        return state;
    }

    if (action.type === 'errFetchingUsersPing') {
        state.isFetching = false;
    }

    if (action.type === 'loggedOutEnd') {
        state.email = false;
        state.avatar = '';
        return state;
    }
    return state;
}

module.exports = user;
