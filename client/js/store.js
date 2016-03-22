'use strict';

let {createStore, combineReducers, applyMiddleware} = require('redux');
let thunkMiddleware = require('redux-thunk').default;

let net = require('reducers/net');
let menu = require('reducers/menu');
let notes = require('reducers/notes');
let counter = require('reducers/counter');
let menu = require('reducers/menu');
let register = require('reducers/register');

const store = createStore(
    combineReducers({
        net,
        menu,
        notes,
        register
    }),
    applyMiddleware(thunkMiddleware)
);

module.exports = store;
