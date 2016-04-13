'use strict';

let {createStore, combineReducers, applyMiddleware} = require('redux');
let thunkMiddleware = require('redux-thunk').default;

let net = require('reducers/net');
let menu = require('reducers/menu');
let notes = require('reducers/notes');
let register = require('reducers/register');
let login = require('reducers/login');
let user = require('reducers/user');
let tags = require('reducers/tags');
let note = require('reducers/note');
let profile = require('reducers/profile');
let snackbar = require('reducers/snackbar');
let sweetalert = require('reducers/sweetalert');

const store = createStore(
    combineReducers({
        net,
        menu,
        notes,
        register,
        login,
        user,
        tags,
        note,
        profile,
        snackbar,
        sweetalert
    }),
    applyMiddleware(thunkMiddleware)
);

module.exports = store;
