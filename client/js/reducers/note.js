'use strict';

const noteModel = require('models/note');

function note(state = noteModel, action) {
    if (action.type === 'startFetchingNote') {
        state.isFetching = true;
        return state;
    }
    if (action.type === 'endFetchingNote') {
        state.isFetching = false;
        state.data = [...action.res.body];
        return state;
    }
    return state;
}

module.exports = note;
