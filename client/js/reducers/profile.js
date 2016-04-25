'use strict';

const userModel = require('models/profile');

function profile(state = userModel, action) {
    if (action.type === 'startProcessing' && action.data.reducer === 'profile' && action.data.action === 'read') {
        return {...state, payload: action.data.params};
    }

    if (action.type === 'startProcessing' && action.data.reducer === 'profile' && action.data.action === 'update') {
        let {editForm, row} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        var data = new FormData();
        data.append('_id', row['_id']);
        editForm.fields.forEach(function (item) {
            if (!item.readOnly) {
                data.append(item.name, item.value);
            }
        });
        return {...state, payload: data};
    }

    if (action.type === 'cancelEditMode') {
        let {editForm, row} = state;
        let {fields} = state.editForm;
        for (var i = 0; i < fields.length; i++) {
            fields[i].value = row[fields[i].name];
            fields[i].isDirty = false;
            fields[i].isValid = true;
        }

        return {...state, editForm: {...editForm, fields, enableEditMode: false} };
    }

    if (action.type === 'changeProfileEditFormField') {
        let {name, value} = action;
        let {editForm} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        let i = editForm.fields.reduce((result, field, i) =>
            result === null || field.name === name ? i : result, null);

        let field = editForm.fields[i];
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
        return {...state, editForm};
    }

    if (action.type === 'setEnableProfileMode') {
        let enableEditMode = action.value;
        let {editForm} = state;
        return {...state, editForm: {...editForm, enableEditMode}};
    }

    if (action.type === 'endProcessing' && action.data.reducer === 'profile') {
        let resData = action.data.body;
        let {editForm} = state;
        let {fields} = state.editForm;
        for (var i = 0; i < fields.length; i++) {
            fields[i].value = resData[fields[i].name];
        }

        return {...state, row: action.data.body, editForm: {...editForm, fields, enableEditMode: false} };
    }

    return state;
}

module.exports = profile;
