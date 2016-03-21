'use strict';

const markersModel = require('models/markers');

function table(state = markersModel, action) {
    if (action.type === 'startFetchingMarkers') {
        state.isFetching = true;
        return state;
    }
    if (action.type === 'endFetchingMarkers') {
        state.isFetching = false;
        state.rows = [...action.res.body];
        return state;
    }
    return state;
}

module.exports = table;
