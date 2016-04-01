'use strict';

function endFetchingModel(Model, data) {
    return {
        type: `endFetching${Model}`,
        data: data.body,
        statusCode: data.statusCode
    };
}

module.exports = endFetchingModel;
