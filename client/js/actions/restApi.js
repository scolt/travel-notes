'use strict';

const request = require('superagent');

function restApi({model, ext = 'json', action = 'read', id = '', type} = {}) {
    return (dispatch, getState) => {
        const payload = getState()[model].payload;
        dispatch({type: 'startProcessing'});
        return request
            .post(`/restApi/${model}.${ext}/${action}/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${window.sessionStorage.token}`)
            .send(payload)
            .end((err, res) => {
                dispatch({type: 'endProcessing'});
                dispatch(err ?
                    {type: 'errProcessing', err} :
                    {type, data: res.body}
                );
            });
    };
}

module.exports = restApi;
