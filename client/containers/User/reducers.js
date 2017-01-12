import userModel from './common/ModelUsers';

import loginReducer from './Login/ReducerLogin';
import logoutReducer from './Logout/ReducerLogout';
import profileReducer from './Profile/ReducerProfile';
import formReducer from 'common/reducers/formReducer';

const userReducers = [
    loginReducer,
    logoutReducer,
    profileReducer,
    formReducer('users')
];

function notes(state = userModel, action) {
    let candidate = userReducers.filter(item => {
        return item(state, action);
    }).pop();
    return candidate ? candidate(state, action) : state;
}

export default notes;
