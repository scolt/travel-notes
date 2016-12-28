function abortRequest(request) {
    request && request.abort();
    return {
        type: 'abortRequest'
    };
}

export default abortRequest;
