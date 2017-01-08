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
        window.sessionStorage.removeItem('token');
        return {...state, user};
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'users') {
        if (action.reqData.type === 'login') {
            const {loginForm} = state;
            window.sessionStorage.setItem('token',  action.resData.token);
            location.href = loginForm.prevState ? loginForm.prevState : '#/main';
            return {...state, user: {...action.resData}, loginForm: {...loginForm, prevState: null}};
        }

        if (action.reqData.type === 'ping') {
            if (action.resData.err) return state;
            return {...state, user: action.resData};
        }
    }

    return false;
}
