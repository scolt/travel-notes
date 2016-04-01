'use strict';

function profile(state = {}, action) {
    if (action.type === 'endFetchingUsersRead' || action.type === 'endFetchingUsersUpdate') {
        return {...action.data};
    }

    if (action.type === 'setEnableProfileMode') {
        let enableEditMode = action.value;
        return {...state, enableEditMode};
    }

    return state;
}

module.exports = profile;
