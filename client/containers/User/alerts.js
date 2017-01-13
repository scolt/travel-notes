export default function (state, action) {
    if (action.type === 'userSessionExpired') {
        const open = true;
        const message = 'Your current session expired. Please login again.';
        return {...state, open, message};
    }

    if (action.type === 'logout') {
        const open = true,
            type = 'success',
            beforeConfirm = () => location.href = `#/`,
            message = 'You was successful logout.';
        return {...state, open, message, type, beforeConfirm};
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'users') {
        if (action.reqData.type === 'updateUser') {
            let {open, message, title, type} = state;
            open = true;
            message = 'Your profile successful updated';
            type = 'success';
            return {...state, open, message, title, type};
        }

        if (action.reqData.type === 'register') {
            let {open, message, title, type, beforeConfirm} = state;
            open = true;
            message = 'Your user successful created';
            type = 'success';
            beforeConfirm = () => location.href = `#/main`;
            return {...state, open, message, title, type, beforeConfirm};
        }
    }

    if (action.type === 'errProcessing' && action.reqData.model === 'users') {
        if (action.reqData.type === 'login') {
            let {open, message, title, type} = state;
            open = true;
            message = 'You provide wrong email or password. Please try again.';
            type = 'error';
            return {...state, open, message, title, type};
        }

        if (action.reqData.type === 'login') {
            let {open, message, title, type} = state;
            open = true;
            message = 'You provide wrong data. Maybe your email or username has already registered. Please try again.';
            type = 'error';
            return {...state, open, message, title, type};
        }
    }

    return false;
}
