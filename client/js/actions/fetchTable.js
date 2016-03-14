'use strict';

let request = require('superagent');

let fetchTable = function fetchTable(page) {
    return dispatch => {
        dispatch({type: 'startFetchingTable'});

        return request
            .post('/restApi/table.json/read')
            .send({page})
            .set('Accept', 'application/json')
            .end((err, res) => dispatch({type: 'endFetchingTable', err, res, page}));
    };
};

module.exports = fetchTable;
