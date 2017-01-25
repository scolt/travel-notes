export default function (state, action) {
    if (action.type === 'disableUserEditMode') {
        let {registerForm, editMode} = state;
        editMode = false;
        for (let field of registerForm.fields) {
            if (field.type === 'file') field.value = '';
        }
        return {...state, editMode};
    }

    if (action.type === 'prepareUserPayload') {
        let {registerForm} = state;
        registerForm = {...registerForm, fields: [...registerForm.fields]};
        const data = new FormData();

        registerForm.fields.forEach(item => {
            if (item.type === 'file' && !item.value) return;
            if (item.value === 'fakevalue') return;
            data.append(item.name, item.value);
        });
        return {...state, payload: data};
    }

    if (action.type === 'enableUserEditMode') {
        let {registerForm, profile, editMode} = state;
        editMode = true;
        for (let field of registerForm.fields) {
            field.value = profile[field.name] || field.value;
            if (field.type === 'file') field.value = 'fakevalue';
            if (field.name === 'password') field.value = 'fakevalue';
            registerForm.isValid = true;
        }
        return {...state, editMode};
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'users') {
        if (action.reqData.type === 'prepareProfile') {
            return {...state, profile: {...action.resData}};
        }

        if (action.reqData.type === 'updateUser') {
            let {registerForm} = state;
            for (let field of registerForm.fields) {
                if (field.type === 'file') field.value = '';
            }
            return {...state, profile: {...action.resData}, user: {...action.resData}, editMode: false, registerForm};
        }
    }
}
