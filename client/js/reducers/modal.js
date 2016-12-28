import {modal as modalModel} from 'models';

function modal(state = modalModel, action) {
    if (action.type === 'openModal') {
        const open = true;
        const {content, className} = action;
        return {...state, open, content, className};
    }

    if (action.type === 'modalClose') {
        const open = false;
        return {...state, open};
    }

    return state;
}

export default modal;
