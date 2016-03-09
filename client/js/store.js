'use strict';

let {createStore, combineReducers} = require('redux');
let counter = require('reducers/counter');
let menu = require('reducers/menu');

let store = createStore(
    combineReducers({
        counter,
        menu
    })
);

module.exports = store;
