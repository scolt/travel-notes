import {snackbar as snackbarModel} from 'models';

function snackbar(state = snackbarModel, action) {
    if (action.type === 'login') {
        const open = true;
        const message = 'You are successful logged in';
        return {...state, open, message};
    }

    if (action.type === 'logout') {
        const open = true;
        const message = 'You are successful logged out';
        return {...state, open, message};
    }

    if (action.type === 'endFetchingUsersUpdate') {
        const open = true;
        const message = 'User details successful updated';
        return {...state, open, message};
    }

    if (action.type === 'snackbarClose') {
        const open = false;
        const message = '';
        return {...state, open, message};
    }

    return state;
}

export default snackbar;
