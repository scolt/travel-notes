'use strict';

const tableModel = require('models/table');

function table(state = tableModel, action) {
    if (action.type === 'startFetchingTable') {
        state.isFetching = true;
        return state;
    }
    if (action.type === 'endFetchingTable') {
        state.isFetching = false;
        state.rows = [...action.res.body.rows];
        state.rows = action.res.body.rows.map(row => Object.assign({}, row));
        state.page = action.page;
        return state;
    }
    return state;
}

module.exports = table;
