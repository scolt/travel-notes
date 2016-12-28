import {sweetalert as sweetalertModel} from 'models';

function sweetalert(state = sweetalertModel, action) {
    if (action.type === 'errProcessing') {
        if (action.data.type === 'login') {
            let open = true;
            let title = action.err.message;
            let message = 'Unexpected error, please try again';

            let type = 'error';
            if (action.err.status == 401) {
                message = 'Username or password is invalid';
            }
            return {...state, open, title, message, type};
        }

        if (action.data.type === 'createUser') {
            let open = true;
            let title = action.err.message;
            let message = 'Unexpected error, please try again';
            let type = 'error';
            if (action.err.response.body.code == '11000') {
                title = 'This email exists';
                message = 'This email already registered in the application.';
            }
            return {...state, open, title, message, type};
        }

    }

    if (action.type === 'createUser') {
        let open = true;
        let title = 'Registered!';
        let message = 'You are successful registered and logged in application.';
        let type = 'success';
        let redirectTo = '#/home';
        return {...state, open, title, message, type, redirectTo};
    }

    if (action.type === 'createNote') {
        setTimeout(() => window.location.hash = '#/home');
        let open = true;
        let title = 'Created!';
        let message = 'You are successful create a new note.';
        let type = 'success';
        return {...state, open, title, message, type};
    }

    if (action.type === 'alertClose') {
        let open = false;
        let redirectTo = null;

        if (state.redirectTo) {
            window.location.hash = state.redirectTo;
        }
        return {...state, open, redirectTo};
    }

    return state;
}

export default sweetalert;
