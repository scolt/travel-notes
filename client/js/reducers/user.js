'use strict';

const userModel = require('models/user');

function user(state = userModel, action) {
    //let successfulTypes = ['endFetchingUsersPing', 'endFetchingUsersLogin', 'endFetchingUsersRegister', 'endFetchingUsersUpdate'];
    //
    //if (successfulTypes.indexOf(action.type) > -1) {
    //    let isFetching = false;
    //    let user = {};
    //    if (action.statusCode === 200) {
    //        user.email = action.data.email;
    //        user.avatar = action.data.avatar;
    //        user.username = action.data.username;
    //    }
    //    return {...state, ...user, isFetching};
    //}
    //
    //if (action.type === 'errFetchingUsersPing') {
    //    let isFetching = false;
    //    return {...state, isFetching};
    //}
    //
    //if (action.type === 'loggedOutEnd') {
    //    let user = {};
    //    user.email = false;
    //    user.avatar = '';
    //    return {...state, ...user};
    //}

    return state;
}

module.exports = user;
