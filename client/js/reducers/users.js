'use strict';

const usersModel = require('models/users');

function users(state = usersModel, action) {

    if (action.type === 'ping') {
        return {...state, user: action.data};
    }

    if (action.type === 'logout') {
        window.sessionStorage.token = null;
        location.href = '#';
        return {...usersModel};
    }

    if (action.type === 'preparePayloadForUserLogin') {
        let {loginForm: editForm} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        const data = new FormData();
        editForm.fields.forEach(function (item) {
            if (!item.readOnly) {
                data.append(item.name, item.value);
            }
        });
        return {...state, payload: data};
    }

    if (action.type === 'login') {
        let {loginForm} = state;
        window.sessionStorage.token = action.data.token;
        location.href = loginForm.prevState ? loginForm.prevState : '#';
        return {...state, user: {...action.data}, loginForm: {...loginForm, prevState: null}};
    }

    if (action.type === 'loginForAdd') {
        let {loginForm} = state;
        location.href = '#/login';
        return {...state, loginForm: {...loginForm, prevState: '#/add'}};
    }

    if (action.type === 'preparePayloadForUserProfile') {
        const payload = {userId: action.id};
        return {...state, payload};
    }

    if (action.type === 'preparePayloadForUserUpdate') {
        let {editForm, user} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        const data = new FormData();
        data.append('_id', user['_id']);
        editForm.fields.forEach(function (item) {
            if (!item.readOnly) {
                data.append(item.name, item.value);
            }
        });
        return {...state, payload: data};
    }

    if (action.type === 'cancelEditMode') {
        let {editForm, user} = state;
        let {fields} = state.editForm;
        for (var i = 0; i < fields.length; i++) {
            fields[i].value = user[fields[i].name];
            fields[i].isDirty = false;
            fields[i].isValid = true;
        }

        return {...state, editForm: {...editForm, fields, enableEditMode: false} };
    }


    if (action.type === 'setEnableProfileMode') {
        const enableEditMode = action.value;
        let {editForm} = state;
        return {...state, editForm: {...editForm, enableEditMode}};
    }

    if (action.type === 'prepareProfile') {
        let resData = action.data;
        let {editForm, user} = state;
        let {fields} = state.editForm;
        for (var i = 0; i < fields.length; i++) {
            fields[i].value = resData[fields[i].name];
        }

        resData.owner = user.username === resData.username;

        return {...state, profile: resData, editForm: {...editForm, fields, enableEditMode: false} };
    }

    if (action.type === 'prepareUser') {
        let resData = action.data;
        let {editForm} = state;
        let {fields} = state.editForm;
        for (var i = 0; i < fields.length; i++) {
            fields[i].value = resData[fields[i].name];
        }

        return {...state, user: action.data, editForm: {...editForm, fields, enableEditMode: false} };
    }

    if (action.type === 'onChangeFormField') {
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

    if (action.type === 'preparePayloadForUserCreate') {
        let {registerForm: editForm} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        const data = new FormData();
        editForm.fields.forEach(function (item) {
            if (!item.readOnly) {
                data.append(item.name, item.value);
            }
        });
        return {...state, payload: data};
    }

    if (action.type === 'createUser') {
        window.sessionStorage.token = action.data.token;
        return {...state, user: {...action.data}};
    }

    return state;
}

module.exports = users;
