'use strict';

import request from 'superagent';

export function registerUser(page) {
    return dispatch => {
        dispatch({type: 'startFetchingRegister'});
        return request
            .post('/restApi/users.json/register')
            .send(page)
            .set('Accept', 'application/json')
            .end((err, res) => dispatch({type: 'endFetchingRegister', err, res, page}));
    };
}

export function loginUser(page) {
    return dispatch => {
        dispatch({type: 'startFetchingLogin'});
        return request
            .post('/restApi/users.json/login')
            .send(page)
            .set('Accept', 'application/json')
            .end((err, res) => dispatch({type: 'endFetchingLogin', err, res, page}));
    };
}

export function pingUser(page) {
    return dispatch => {
        dispatch({type: 'startFetchingPing'});
        return request
            .post('/restApi/users.json/me')
            .send()
            .set('Authorization', 'Bearer ' + window.sessionStorage.token)
            .set('Accept', 'application/json')
            .end((err, res) => dispatch({type: 'endFetchingPing', err, res, page}));
    };
}

export function logoutUser() {
    return dispatch => {
        window.sessionStorage.token = null;
        dispatch({type: 'loggedOutEnd'});
    };
}


