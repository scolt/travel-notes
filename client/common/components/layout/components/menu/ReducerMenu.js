import menuModel from './ModelMenu';

function menu(state = menuModel, action) {
    if (action.type === 'updateMenuStatus') {
        const menuOpen = action.status;
        return {...state, menuOpen};
    }

    if (action.type === 'openMenuItem') {
        const menuOpen = false;
        window.location.hash = action.path;
        return {...state, menuOpen};
    }

    return state;
}

export default menu;
