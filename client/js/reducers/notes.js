import {notes as notesModel} from 'models';

function notes(state = notesModel, action) {
    if (action.type === 'prepareNote') {
        return {...state, note: action.data.result.map(note => ({
            id: note['_id'],
            title: note.title,
            subtitle: note.subtitle,
            text: note.text,
            author: note.userId,
            photos: note.photos,
            position: {
                lng: parseFloat(note.lng),
                lat:  parseFloat(note.lat)
            }
        }))[0]};
    }

    if (action.type === 'onAdditionalImageSet') {
        const {value} = action;
        const {addImageForm} = state;
        addImageForm.fields[0].value = value;
        return {...state};
    }

    if (action.type === 'preparePayloadForAdditionalImage') {
        const data = new FormData();
        const field = state.addImageForm.fields[0];
        data.append('id', state.note.id);
        data.append(field.name, field.value);
        field.value = '';
        return {...state, payload: data};
    }

    if (action.type === 'prepareMarkers') {
        return {...state, markers: action.data.result.map(item =>
            ({
                window: {
                    descr: item.text ? item.text.substr(0, 250) + '...' : '',
                    title: item.title,
                    link: `#/note/${item._id}`,
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

    if (action.type === 'restoreNoteFilterPayload') {
        let {filters, payload} = state;
        let newPreparedServerFilters = {},
            orderBy = {};

        if (filters.onlyMy) {
            newPreparedServerFilters['userId'] = filters.onlyMy;
        }

        if (filters.orderBy) {
            orderBy[filters.orderBy.name] = filters.orderBy.direction;
        }

        return {...state, payload: {...payload, filters: {...newPreparedServerFilters}, order: orderBy}};
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
                if (filters) {
                    delete filters.userId;
                }
            }

            Object.keys(action.filters).forEach(function (key) {
                if (key === 'userId') {
                    newClientFilters.onlyMy = action.currentUserID == action.filters[key] ? action.currentUserID : false;
                    newPreparedServerFilters[key] = action.filters[key];
                }
            });
        }

        if (action.updated === 'order') {
            const direction = payload.order && payload.order[action.orderBy] ?
                payload.order[action.orderBy] === 1 ? -1 : 1 : 1;

            newClientFilters.orderBy = {
                name: action.orderBy,
                direction: direction
            };

            orderBy[action.orderBy] = direction;
        }


        return {...state, filters: {...state.filters, ...newClientFilters}, payload: {...payload, filters: {...filters, ...newPreparedServerFilters}, order: orderBy}};
    }

    if (action.type === 'prepareNotePayload') {
        let {noteForm: editForm} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        const data = new FormData();
        editForm.fields.forEach(function (item) {
            if (item.readOnly) return;
            if (item.name === 'position') {
                data.append('lat', item.value.lat);
                data.append('lng', item.value.lng);
            } else {
                data.append(item.name, item.value);
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
            if (item.validateObject) {
                item.isValid = true;
                item.requiredFields.forEach(key => {
                    if (!item.value[key]) {
                        item.isValid = false;
                        error = true;
                    }
                });
            }

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

    if (action.type === 'endProcessing' && action.data.model === 'notes') {
        if (action.data.action === 'delete') {
            let {notes} = state;
            const index = notes.findIndex(note => note['_id'] === action.data.id);
            if (index > -1) {
                notes.splice(index, 1);
            }
            return {...state, notes};
        }
        if (action.data.type === 'addImage') {
            const {note} = state;
            try {
                note.photos = action.data.data.result[0].photos;
            } catch(e) {}

            return {...state, note};
        }
    }

    return state;
}

export default notes;
