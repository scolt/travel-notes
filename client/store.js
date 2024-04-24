import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import notes from './containers/Note/reducers';
import alert from './common/components/alerts/ReducerAlert';
import users from './containers/User/reducers';
import menu from './common/components/layout/components/menu/ReducerMenu';

const store = createStore(
    combineReducers({
        notes,
        menu,
        users,
        alert
    }),
    applyMiddleware(thunkMiddleware)
);

export default store;
