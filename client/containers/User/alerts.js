export default function (state, action) {
    if (action.type === 'userSessionExpired') {
        const open = true;
        const message = 'Your current session expired. Please login again.';
        return {...state, open, message};
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'users') {
        if (action.reqData.type === 'updateUser') {
            let {open, message, title, type} = state;
            open = true;
            message = 'Your profile successful updated';
            type = 'success';
            return {...state, open, message, title, type};
        }
    }

    return false;
}
