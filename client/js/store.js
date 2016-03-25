'use strict';

let {createStore, combineReducers, applyMiddleware} = require('redux');
let thunkMiddleware = require('redux-thunk').default;

let net = require('reducers/net');
let menu = require('reducers/menu');
let notes = require('reducers/notes');
let menu = require('reducers/menu');
let register = require('reducers/register');
let login = require('reducers/login');
let user = require('reducers/user');

const store = createStore(
    combineReducers({
        net,
        menu,
        notes,
        register,
        login,
        user
    }),
    applyMiddleware(thunkMiddleware)
);

module.exports = store;
