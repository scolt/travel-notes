'use strict';

function profile(state = {}, action) {
    if (action.type === 'endFetchingUsersRead' || action.type === 'endFetchingUsersUpdate') {
        return state = {...action.data};
    }

    if (action.type === 'setEnableProfileMode') {
        state.enableEditMode = action.value;
    }

    return state;
}

module.exports = profile;
