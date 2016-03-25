'use strict';

let request = require('superagent');

let startFetchingModel = require('actions/startFetchingModel');
let endFetchingModel = require('actions/endFetchingModel');
let errFetchingModel = require('actions/errFetchingModel');

function fetchModel(model) {
    return dispatch => {
        let Model = `${model.charAt(0).toUpperCase()}${model.slice(1)}`;
        dispatch(startFetchingModel(Model));

        return request
            .post(`/restApi/${model}.json/read`)
            .send()
            .set('Accept', 'application/json')
            .end((err, res) => dispatch(err ? errFetchingModel(Model, err) : endFetchingModel(Model, res.body)));
    };
}

module.exports = fetchModel;
