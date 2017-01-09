export default function (state, action) {
    if (action.type === 'resetNoteFilterPayload') {
        let {filters, payload} = state;
        filters.filters = {};
        filters.order = {};
        filters.fields = '';
        filters.page = 1;
        return {...state, payload: {...payload, ...filters}};
    }

    if (action.type === 'updateFilter') {
        let {filters, payload} = state;
        filters.page = action.page || filters.page;

        if (action.order) {
            filters.page = 1;
            filters.order = {};
            filters.order[action.order] = 1;
        }

        if (action.fields) {
            filters.fields = action.fields.join(' ');
        }

        if (action.filters) {
            Object.keys(action.filters).forEach(key => {
                if (action.filters[key]) {
                    filters.filters[key] = action.filters[key];
                } else {
                    delete filters.filters[key];
                }
            });
        }

        return {...state, payload: {...payload, ...filters}, filters: {...filters}};
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'notes') {
        if (action.reqData.type === 'deleteOneNote') {
            const {notes} = state;
            const index = notes.findIndex(note => note['_id'] === action.reqData.id);

            if (index > -1) notes.splice(index, 1, action.resData.result[0]);
            return {...state, notes, totalPages: action.resData.pages};
        }

        if (action.reqData.type === 'getNotes') {
            return {...state, totalPages: action.resData.pages, notes: action.resData.result};
        }
    }

    return false;
}
