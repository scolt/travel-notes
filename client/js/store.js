'use strict';

let {createStore, combineReducers, applyMiddleware} = require('redux');
let thunkMiddleware = require('redux-thunk').default;

let net = require('reducers/net');
let menu = require('reducers/menu');
let notes = require('reducers/notes');

const store = createStore(
    combineReducers({
        net,
        menu,
        notes
    }),
    applyMiddleware(thunkMiddleware)
);

module.exports = store;
