import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {menu, modal, net, notes, snackbar, sweetalert, users} from 'reducers';

const store = createStore(
    combineReducers({
        net,
        menu,
        notes,
        snackbar,
        sweetalert,
        modal,
        users
    }),
    applyMiddleware(thunkMiddleware)
);

export default store;
