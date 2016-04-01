'use strict';

const menuModel = require('models/menu');

function menu(state = menuModel, action) {

    if (action.type === 'openLeftNavMenu') {
        let open = true;
        return {...state, open};
    } else if (action.type === 'closeLeftNavMenu') {
        let open = false;
        return {...state, open};
    }
    return state;
}

module.exports = menu;
