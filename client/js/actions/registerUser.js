'use strict';

let request = require('superagent');

let registerUser = function registerUser(page) {
    return dispatch => {
        dispatch({type: 'startFetchingRegister'});

        return request
            .post('/restApi/users.json/register')
            .send(page)
            .set('')
            .set('Accept', 'application/json')
            .end((err, res) => dispatch({type: 'endFetchingRegister', err, res, page}));
    };
};

module.exports = registerUser;
