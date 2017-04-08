export default function (state, action) {
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

    if (action.type === 'userSessionExpired') {
        const user = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            avatar: '',
            owner: true
        };
        window.localStorage.removeItem('token');
        return {...state, user};
    }

    if (action.type === 'createNoteDenied') {
        const {loginForm} = state;
        setTimeout(() => window.location.hash = 'login');
        return {...state, user: {...action.resData}, loginForm: {...loginForm, prevState: action.path}};
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'users') {
        if (action.reqData.type === 'login') {
            const {loginForm} = state;
            window.localStorage.setItem('token',  action.resData.token);
            location.href = loginForm.prevState ? loginForm.prevState : '#/main';
            loginForm.isValid = false;
            loginForm.fields.forEach(function (item) {
                item.value = '';
                item.isValid = false;
                item.isDirty = false;
                item.isTouch = false;
            });
            return {...state, user: {...action.resData}, loginForm: {...loginForm, prevState: null}};
        }

        if (action.reqData.type === 'ping') {
            if (action.resData.err) return state;
            return {...state, user: action.resData};
        }
    }

    return false;
}
