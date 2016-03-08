'use strict';

const menuModel = require('models/menu');

function menu(state = menuModel) {
    return state;
}

module.exports = menu;
