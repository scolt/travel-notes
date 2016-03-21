'use strict';

let {createStore, combineReducers, applyMiddleware} = require('redux');
let thunkMiddleware = require('redux-thunk').default;
let counter = require('reducers/counter');
let menu = require('reducers/menu');

let table = require('reducers/table');
let markers = require('reducers/markers');

const store = createStore(
    combineReducers({
        counter,
        menu,
        table,
        markers
    }),
    applyMiddleware(thunkMiddleware)
);

module.exports = store;
