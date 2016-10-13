'use strict';

let {createStore, combineReducers, applyMiddleware} = require('redux');
let thunkMiddleware = require('redux-thunk').default;

let net = require('reducers/net');
let menu = require('reducers/menu');
let notes = require('reducers/notes');
let snackbar = require('reducers/snackbar');
let sweetalert = require('reducers/sweetalert');
let modal = require('reducers/modal');
let users = require('reducers/users');

const store = createStore(
    combineReducers({
        net,
        menu,
        notes,
        snackbar,
        sweetalert,
        modal,
        users
    }),
    applyMiddleware(thunkMiddleware)
);

module.exports = store;
