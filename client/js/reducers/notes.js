'use strict';

const notesModel = require('models/notes');

function notes(state = notesModel, action) {
    if (action.type === 'prepareNote') {
        return {...state, note: action.data.result.map(note => ({
            title: note.title,
            subtitle: note.subtitle,
            text: note.text,
            author: note.userId,
            photo: note.photo,
            position: {
                lng: parseFloat(note.lng),
                lat:  parseFloat(note.lat)
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
                    lng: parseFloat(item.lng),
                    lat:  parseFloat(item.lat)
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
                                        payload.order[action.orderBy] === 1 ? -1 : 1 : 1;
        }


        return {...state, filters: {...state.filters, ...newClientFilters}, payload: {...payload, filters: {...filters, ...newPreparedServerFilters}, order: orderBy}};
    }

    if (action.type === 'prepareNotePayload') {
        let {noteForm: editForm} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        var data = new FormData();
        editForm.fields.forEach(function (item) {
            if (!item.readOnly) {
                if (item.name === 'position') {
                    data.append('lat', item.value.lat);
                    data.append('lng', item.value.lng);
                } else {
                    data.append(item.name, item.value);
                }
            }
        });
        return {...state, payload: data};
    }

    if (action.type === 'onChangeFormFieldNote') {
        const {name, value, formName} = action;
        let editForm = state[formName];
        if (!editForm) return state;
        editForm = {...editForm, fields: [...editForm.fields]};
        const i = editForm.fields.reduce((result, field, i) =>
            result === null || field.name === name ? i : result, null);

        const field = editForm.fields[i];
        field.value = value;
        field.isDirty = true;

        let error = false;

        editForm.fields = editForm.fields.map(function (item) {
            if (item.validate) {
                item.isValid = item.validate.test(item.value);
                if (!item.isValid) error = true;
                item.errorText = !item.isValid && (item.isDirty || item.isTouch) ? item.validationMessage : null;
            }
            return item;
        });

        editForm.isValid = !error;
        state[formName] = editForm;
        return {...state};
    }

    return state;
}

module.exports = notes;
