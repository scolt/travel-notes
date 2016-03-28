'use strict';

function abortRequest(request) {
    request && request.abort();
    return {
        type: 'abortRequest'
    };
}

module.exports = abortRequest;
