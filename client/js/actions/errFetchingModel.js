'use strict';

function errFetchingModel(Model, err, res) {
    return {
        type: `errFetching${Model}`,
        err,
        data: res.body
    };
}

module.exports = errFetchingModel;
