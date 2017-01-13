export default function (state, action) {
    if (action.type === 'endProcessing' && action.reqData.model === 'users') {
        if (action.reqData.type === 'register') {
            const {loginForm} = state;
            window.sessionStorage.setItem('token',  action.resData.token);
            location.href = loginForm.prevState ? loginForm.prevState : '#/main';
            return {...state, user: {...action.resData}, loginForm: {...loginForm, prevState: null}};
        }
    }
}
