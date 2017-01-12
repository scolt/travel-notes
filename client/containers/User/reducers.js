import userModel from './common/ModelUsers';

import loginReducer from './Login/ReducerLogin';
import profileReducer from './Profile/ReducerProfile';
import formReducer from 'common/reducers/formReducer';

const userReducers = [
    loginReducer,
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
