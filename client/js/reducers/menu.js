'use strict';

const menuModel = require('models/menu');

function menu(state = menuModel, action) {
    switch (action.type) {
    case 'openLeftNavMenu': state.open = true; break;
    case 'closeLeftNavMenu': state.open = false; break;
    }
    return state;
}

module.exports = menu;
