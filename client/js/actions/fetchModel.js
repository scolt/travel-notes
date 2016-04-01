'use strict';

let request = require('superagent');

let startFetchingModel = require('actions/startFetchingModel');
let endFetchingModel = require('actions/endFetchingModel');
let errFetchingModel = require('actions/errFetchingModel');

function fetchModel(model, params) {
    return dispatch => {
        let action = params && params.action ? params.action : 'read';
        let Model = `${model.charAt(0).toUpperCase()}${model.slice(1)}${action.charAt(0).toUpperCase()}${action.slice(1)}`;
        dispatch(startFetchingModel(Model));

        return request
            .post(`/restApi/${model}.json/${action}`)
            .send(params ? params.data : null)
            .set('Authorization', 'Bearer ' + window.sessionStorage.token)
            .set('Accept', 'application/json')
            .end((err, res) => dispatch(err ? errFetchingModel(Model, err, res) : endFetchingModel(Model, res)));
    };
}

module.exports = fetchModel;
