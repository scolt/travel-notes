export default function (state, action) {
    if (action.type === 'userSessionExpired') {
        const open = true;
        const message = 'Your current session expired. Please login again.';
        return {...state, open, message};
    }

    return false;
}
