'use strict';

const noteModel = require('models/note');

function note(state = noteModel, action) {
    if (action.type === 'startProcessing' && action.data.reducer === 'note') {
        const isProcessing = true;
        return {...state, isProcessing};
    }

    if (action.type === 'endProcessing' && action.data.reducer === 'note') {
        const isProcessing = false;

        return {...state, isProcessing, note: action.data.body.result.map(note => ({
            title: note.title,
            subtitle: note.subtitle,
            text: note.text,
            photo: note.photo,
            position: {
                lat: note.lat,
                lng: note.lng
            }
        }))[0]};
    }

    return state;
}

module.exports = note;
