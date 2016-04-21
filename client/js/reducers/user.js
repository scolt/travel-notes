'use strict';

const userModel = require('models/user');

function user(state = userModel, action) {
    if (action.type === 'endProcessing' && action.data.reducer === 'register') {
        return {...action.data.body};
    }

    return state;
}

module.exports = user;
