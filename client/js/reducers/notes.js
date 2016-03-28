'use strict';

const notesModel = require('models/notes');

function notes(state = notesModel, action) {
    if (action.type === 'endFetchingNotes') {
        return action.data.map(note => Object.assign({}, note, {window: {...note, link: `#/note/${note._id}`}}));
    }
    return state;
}

module.exports = notes;
