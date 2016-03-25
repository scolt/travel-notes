'use strict';

function errFetchingModel(Model, err) {
    return {
        type: `errFetching${Model}`,
        err
    };
}

module.exports = errFetchingModel;
