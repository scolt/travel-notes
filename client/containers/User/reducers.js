import userModel from './common/ModelUsers';

import loginReducer from './Login/ReducerLogin';
import registerReducer from './Register/ReducerRegister';
import logoutReducer from './Logout/ReducerLogout';
import profileReducer from './Profile/ReducerProfile';
import formReducer from 'common/reducers/formReducer';

const userReducers = [
    loginReducer,
    registerReducer,
    logoutReducer,
    profileReducer,
    formReducer('users')
];

function notes(state = userModel, action) {
    const candidate = userReducers.filter(item => {
        return item(state, action);
    }).pop();
    return candidate ? candidate(state, action) : state;
}

export default notes;
