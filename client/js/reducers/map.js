'use strict';

const notesModel = require('models/notes');

function map(state = notesModel, action) {
    if (action.type === 'endProcessing' && action.data.reducer === 'map') {
        return {...state, row: {...action.data.body}};
    }

    return state;
}

module.exports = map;
