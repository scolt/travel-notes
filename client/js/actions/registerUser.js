'use strict';

let request = require('superagent');

let registerUser = function registerUser(page) {
    return dispatch => {
        dispatch({type: 'startFetchingRegister'});

        return request
            .post('/auth/register')
            .send(page)
            .set('Accept', 'application/json')
            .end((err, res) => dispatch({type: 'endFetchingRegister', err, res, page}));
    };
};

module.exports = registerUser;
