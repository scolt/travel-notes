'use strict';

import request from 'superagent';

export function updateUser(page) {
    return dispatch => {
        dispatch({type: 'startUpdatingUser'});
        return request
            .post('/restApi/users.json/update')
            .send(page)
            .set('Authorization', 'Bearer ' + window.sessionStorage.token)
            .set('Accept', 'application/json')
            .end((err, res) => dispatch({type: 'endUpdatingUser', err, res, page}));
    };
}


export function setSuccesLoginFlag(flag) {
    return {
        type: flag ? 'showSuccessLoginSnackbar' : 'hideSuccessLoginSnackbar'
    };
}


