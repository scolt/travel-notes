'use strict';

function startFetchingModel(Model) {
    return {
        type: `startFetching${Model}`
    };
}

module.exports = startFetchingModel;
