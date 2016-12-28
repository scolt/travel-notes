import {net as netModel} from 'models';

function net(state = netModel, action) {
    if (action.type === 'startProcessing') {
        const isProcessing = true;
        const err = null;
        return {...state, isProcessing, err};
    }

    if (action.type === 'endProcessing') {
        const isProcessing = false;
        return {...state, isProcessing};
    }

    if (action.type === 'errProcessing') {
        const err = action.err;
        return {...state, err};
    }

    if (action.type === 'abortRequest') {
        const isProcessing = false;
        return {...state, isProcessing};
    }

    if (action.type === 'clearNetErr') {
        const err = '';
        return {...state, err};
    }

    return state;
}

export default net;
