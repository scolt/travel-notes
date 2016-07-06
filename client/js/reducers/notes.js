'use strict';

const notesModel = require('models/notes');
import store from 'store';

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
        let newPreparedServerFilters = {},
            newClientFilters = {},
            orderBy = {};

        if (action.updated === 'filters') {
            if (!action.filters.userId) {
                newClientFilters.onlyMy = false;
                delete filters.userId;
            }

            Object.keys(action.filters).forEach(function (key) {
                if (key === 'userId') {
                    newClientFilters.onlyMy = action.currentUserID == action.filters[key];
                    newPreparedServerFilters[key] = action.filters[key];
                }
            });
        }

        if (action.updated === 'order') {
            newClientFilters.orderBy = action.orderBy;

            orderBy[action.orderBy] = payload.order && payload.order[action.orderBy] ?
                                        payload.order[action.orderBy] == 1 ? -1 : 1 : 1;
        }


        return {...state, filters: {...state.filters, ...newClientFilters}, payload: {...payload, filters: {...filters, ...newPreparedServerFilters}, order: orderBy}};
    }

    return state;
}

module.exports = notes;
