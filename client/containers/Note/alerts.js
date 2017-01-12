export default function (state, action) {
    if (action.type === 'endProcessing' && action.reqData.model === 'notes') {
        if (action.reqData.type === 'updateNote') {
            let {open, message, title, type} = state;
            open = true;
            message = 'Your note successful updated';
            type = 'success';
            return {...state, open, message, title, type};
        }

        if (action.reqData.type === 'createNote') {
            let {open, message, title, type, beforeConfirm} = state;
            open = true;
            message = 'Your note successful created.';
            type = 'success';
            beforeConfirm = () => location.href = `#/note/${action.resData._id}`;
            return {...state, open, message, title, type, beforeConfirm};
        }
    }

    if (action.type === 'errProcessing' && action.reqData.model === 'notes') {
        if (action.reqData.type === 'deleteOneNote') {
            let {open, message, title, type} = state;
            open = true;
            message = `Sorry we are unable to delete this note.<br><small>Reason: ${action.resData}</small>`;
            type = 'error';
            return {...state, open, message, title, type};
        }

        if (action.reqData.type === 'updateNote') {
            let {open, message, title, type} = state;
            open = true;
            message = `Sorry we are unable to update your note.<br><small>Reason: ${action.resData}</small>`;
            type = 'error';
            return {...state, open, message, title, type};
        }

        if (action.reqData.type === 'createNote') {
            let {open, message, title, type} = state;
            open = true;
            message = `Sorry we are unable to create your note.<br><small>Reason: ${action.resData}</small>`;
            type = 'error';
            return {...state, open, message, title, type};
        }

        if (action.reqData.type === 'prepareNote') {
            let {open, message, title, type, beforeConfirm} = state;
            open = true;
            message = `Sorry we are unable to update load note(s).<br><small>Reason: ${action.resData}</small>`;
            type = 'error';
            beforeConfirm = () => location.href = '#/main';
            return {...state, open, message, title, type, beforeConfirm};
        }
    }

    return false;
}
