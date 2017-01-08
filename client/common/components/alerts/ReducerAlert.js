import alertModel from './ModelAlert';

import noteAlerts from 'containers/Note/alerts';
import userAlerts from 'containers/User/alerts';

const alertReducers = [
    noteAlerts,
    userAlerts
];

function alert(state = alertModel, action) {
    if (action.type === 'alertClose') {
        const open = false,
            message = '',
            title = '',
            type = '',
            showCancelButton = false,
            beforeClose = () => {},
            beforeCancel = () => {},
            beforeConfirm = () => {};
        return {...state, open, message, title, type, beforeCancel, beforeClose, beforeConfirm, showCancelButton};
    }

    if (action.type === 'openAlert') {
        const open = true,
            message = action.message || '',
            title = action.title || '',
            type = action.alertType || 'info',
            showCancelButton = action.showCancelButton || false,
            beforeClose = action.beforeClose || (() => {}),
            beforeCancel = action.beforeCancel || (() => {}),
            beforeConfirm = action.beforeConfirm || (() => {});

        return {...state, open, message, title, type, beforeCancel, beforeClose, beforeConfirm, showCancelButton};
    }

    if (action.type === 'userSessionExpired') {
        const open = true;
        const message = 'Your current session expired. Please login again.';
        return {...state, open, message};
    }

    let candidate = alertReducers.filter(item => {
        return item(state, action);
    }).pop();
    return candidate ? candidate(state, action) : state;
}

export default alert;
