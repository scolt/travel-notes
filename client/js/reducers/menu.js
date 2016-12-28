import {menu as menuModel} from 'models';

function menu(state = menuModel, action) {
    if (action.type === 'openLeftNavMenu') {
        const open = true;
        return {...state, open};
    }

    if (action.type === 'closeLeftNavMenu') {
        const open = false;
        return {...state, open};
    }

    return state;
}

export default menu;
