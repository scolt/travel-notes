'use strict';

const modalModel = require('models/modal');

function modal(state = modalModel, action) {
    if (action.type === 'openModal') {
        let open = true;
        let {content, className} = action;
        return {...state, open, content, className};
    }

    if (action.type === 'modalClose') {
        let open = false;
        return {...state, open};
    }

    return state;
}

module.exports = modal;
