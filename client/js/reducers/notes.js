'use strict';

const notesModel = require('models/notes');

function notes(state = notesModel, action) {
    if (action.type === 'prepareNote') {
        return {...state, note: action.data.result.map(note => ({
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

    if (action.type === 'prepareMarkers') {
        return {...state, markers: action.data.result.map(item =>
            ({
                window: {
                    descr: item.text,
                    title: item.title,
                    link: `/#/note/${item._id}`,
                    photo: item.photo
                },
                position: {
                    lng: item.lng,
                    lat: item.lat
                }
            })
        )};
    }

    if (action.type === 'getNotes') {
        return {...state, notes: action.data.result};
    }

    if (action.type === 'prepareNoteFilterPayload') {
        let {payload} = state;
        let {filters} = state.payload;
        return {...state, payload: {...payload, filters: {...filters, ...action.filters}}};
    }

    return state;
}

module.exports = notes;
