'use strict';
const registerModel = require('models/register');

function register(state = registerModel, action) {
    if (action.type === 'changeRegisterEditFormField') {
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
            if (item.validate && (item.isDirty || item.isTouch)) {
                item.isValid = item.validate.test(item.value);
                if (!item.isValid) error = true;
                item.errorText = !item.isValid && (item.isDirty || item.isTouch) ? item.validationMessage : null;
            }
            return item;
        });

        editForm.isValid = !error;
        return {...state, editForm};
    }

    if (action.type === 'registerButtonSubmitClick') {
        let {editForm} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        var data = new FormData();
        editForm.fields.forEach(function (item) {
            if (!item.readOnly) {
                data.append(item.name, item.value);
            }
        });
        return {...state, payload: data};
    }

    if (action.type === 'endProcessing' && action.data.reducer === 'register') {
        window.sessionStorage.token = action.data.body.token;
    }

    return state;
}

module.exports = register;
