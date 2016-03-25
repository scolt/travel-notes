'use strict';

const userModel = require('models/user');

function user(state = userModel, action) {
    if (action.type === 'endFetchingLogin') {
        if (action.res.statusCode === 200) {
            state.email = 'xvint@bk.ru';
            state.avatar = 'https://avatars0.githubusercontent.com/u/7373601';
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
