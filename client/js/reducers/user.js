'use strict';

const userModel = require('models/user');

function user(state = userModel, action) {
    let successfulTypes = ['endFetchingPing', 'endFetchingLogin', 'endFetchingRegister'];
    if (successfulTypes.indexOf(action.type) > -1) {
        if (action.res.statusCode === 200) {
            state.email = action.res.body.email;
            state.avatar = action.res.body.avatar;
        }
        return state;
    }

    if (action.type === 'loggedOutEnd') {
        state.email = false;
        state.avatar = '';
        return state;
    }
    return state;
}

module.exports = user;
