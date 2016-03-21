'use strict';

let request = require('superagent');

let getMarkers = function getMarkers(user) {
    user = user || '';
    return dispatch => {
        dispatch({type: 'startFetchingMarkers'});

        return request
            .get('/get-markers/' + user)
            .send()
            .set('Accept', 'application/json')
            .end((err, res) => dispatch({type: 'endFetchingMarkers', err, res}));
    };
};

module.exports = getMarkers;
