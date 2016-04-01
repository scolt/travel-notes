'use strict';

let {createStore, combineReducers, applyMiddleware} = require('redux');
let thunkMiddleware = require('redux-thunk').default;

let net = require('reducers/net');
let menu = require('reducers/menu');
let notes = require('reducers/notes');
let register = require('reducers/register');
let login = require('reducers/login');
let user = require('reducers/user');
let note = require('reducers/note');

const store = createStore(
    combineReducers({
        net,
        menu,
        notes,
        register,
        login,
        user,
        note
    }),
    applyMiddleware(thunkMiddleware)
);

module.exports = store;
