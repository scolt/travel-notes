'use strict';

let request = require('superagent');

let startProcessing = require('actions/startProcessing');
let endProcessing = require('actions/endProcessing');
let errProcessing = require('actions/errProcessing');

function restApi({model, ext = 'json', action, id = '', reducer} = {}) {
    return (dispatch, getState) => {
        dispatch(startProcessing({model, ext, action, id, reducer}));
        let payload = getState()[reducer].payload;
        if (payload === 'invalid') return;
        return request
            .post(`/restApi/${model}.${ext}/${action}/${id}`)
            .set('Accept', 'application/json')
            .send(payload)
            .end((err, res) => dispatch(err ?
                errProcessing(err) :
                endProcessing({model, ext, action, id, reducer, body: res.body})
            ));
    };
}

module.exports = restApi;
