'use strict';

const tagsModel = require('models/tags');

function tags(state = tagsModel, action) {
    if (action.type === 'startProcessing' && action.data.reducer === 'tags') {
        if (action.data.action === 'create') {
            let fields = state.editForm.fields.reduce((result, field) =>
                (field.readOnly ? null : (result[field.name] = field.value), result), {});
            return {...state, payload: {fields}};
        }
        if (action.data.action === 'read') {
            let {filters, fields, order, page} = state.table;
            let rowsOnPage = state.rowsOnPageSelector.value;
            order = order.reduce((result, field) =>
                (result[field.field] = field.sort === 'asc' ? 1 : -1, result), {});
            return {...state, payload: {filters, fields, order, page, rowsOnPage}};
        }
        if (action.data.action === 'update') {
            let fields = state.editForm.fields.reduce((result, field) =>
                field.readOnly ?
                    result :
                    (result[field.name] = field.value, result), {});
            return {...state, payload: {fields}};
        }
    }
    if (action.type === 'endProcessing' && action.data.reducer === 'tags') {
        if (action.data.action === 'create' && action.data.body.ok === 1) {
            let {editForm, table} = state;
            let _id = action.data.body.electionId;
            editForm = {
                ...editForm,
                props: {...editForm.props, open: false}
            };
            return {...state, editForm, table: {...table, rows: [...table.rows, {_id, name: editForm.fields[1].value}]}};
        }
        if (action.data.action === 'read') {
            let {err, page, pages, ct, rows} = action.data.body;
            return err ? state : {...state, table: {...state.table, page, pages, ct, rows: [...rows]}};
        }
        if (action.data.action === 'update' && action.data.body.ok === 1) {
            let {editForm, table} = state;
            let _id = action.data.body.electionId;
            editForm = {
                ...editForm,
                props: {...editForm.props, open: false}
            };
            table.rows[table.selectedRow].name = editForm.fields[1].value;
            return {...state, editForm, table: {...table}};
        }
        if (action.data.action === 'del' && action.data.body.ok === 1) {
            let {rows, selectedRow} = state.table;
            rows = [...rows.slice(0, selectedRow), ...rows.slice(selectedRow + 1)];
            selectedRow = undefined;
            return {...state, table: {...state.table, rows, selectedRow}};
        }
        return state;
    }
    if (action.type === 'incTagsPage') {
        let {page, pages} = state.table;
        page = page < pages ? ++page : page;
        return {...state, table: {...state.table, page}};
    }
    if (action.type === 'decTagsPage') {
        let {page, pages} = state.table;
        page = page > 1 ? --page : page;
        return {...state, table: {...state.table, page}};
    }
    if (action.type === 'sortTags') {
        let {order} = state.table;
        order = [...order];
        order[0].sort = order[0].sort === 'asc' ? 'desc' : 'asc';
        return {...state, table: {...state.table, order }};
    }
    if (action.type === 'changeTagsRowsOnPage') {
        let {rowsOnPageSelector} = state;
        rowsOnPageSelector = {...rowsOnPageSelector};
        rowsOnPageSelector.value = action.value;
        return {...state, rowsOnPageSelector};
    }
    if (action.type === 'setTagsRowsOnPage') {
        return {...state, rowsOnPage: action.rowsOnPage};
    }
    if (action.type === 'changeTagsFilter') {
        let {filters} = state.table;
        filters = action.value ? {name: action.value} : {};
        return {...state, table: {...state.table, filters }};
    }
    if (action.type === 'setTagsSelectedRow') {
        let rows = [...state.table.rows];
        let selectedRow = state.table.selectedRow;
        selectedRow !== undefined ? rows[selectedRow].selected = false : null;
        action.selectedRow !== undefined ? rows[action.selectedRow].selected = true : null;
        return {...state, table: {...state.table, rows, selectedRow: action.selectedRow}};
    }
    if (action.type === 'createTag') {
        let {editForm} = state;
        editForm = {
            ...editForm,
            props: {...editForm.props, open: true},
            fields: editForm.fields.map(field => ((field.defaultValue = field.value = ''), field)),
            isValid: false,
            action: 'create'
        };
        return {...state, editForm};
    }
    if (action.type === 'updateTag') {
        let {editForm, table} = state;
        editForm = {
            ...editForm,
            props: {...editForm.props, open: true},
            fields: editForm.fields.map(field => ((field.value = field.defaultValue = table.rows[table.selectedRow][field.name]), field)),
            isValid: false,
            action: 'update'
        };
        return {...state, editForm};
    }
    if (action.type === 'canselTagsEditForm') {
        let {editForm} = state;
        editForm = {
            ...editForm,
            props: {...editForm.props, open: false}
        };
        return {...state, editForm};
    }
    if (action.type === 'changeTagsEditFormField') {
        let {name, value} = action;
        let {editForm} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        let i = editForm.fields.reduce((result, field, i) =>
            result === null || field.name === name ? i : result, null);
        let field = editForm.fields[i];
        field.isDirty = true;
        field.value = value;
        field.isValid = field.validate.test(value);
        field.errorText = !field.isValid && (field.isDirty || field.isTouch) ? field.validationMessage : null;
        editForm.isValid = field.isValid;
        editForm.buttons[1].disabled = !field.isValid;

        return {...state, editForm};
    }
    if (action.type === 'blurTagsEditFormField') {
        let {name, value} = action;
        let {editForm} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        let i = editForm.fields.reduce((result, field, i) =>
            result === null || field.name === name ? i : result, null);
        let field = editForm.fields[i];
        field.isTouch = true;
        field.value = value;
        field.isValid = field.validate.test(value);
        field.errorText = !field.isValid && (field.isDirty || field.isTouch) ? field.validationMessage : null;
        editForm.isValid = field.isValid;
        editForm.buttons[1].disabled = !field.isValid;

        return {...state, editForm};
    }

    return state;
}

module.exports = tags;
