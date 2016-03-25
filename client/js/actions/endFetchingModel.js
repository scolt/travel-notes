'use strict';

function endFetchingModel(Model, data) {
    return {
        type: `endFetching${Model}`,
        data
    };
}

module.exports = endFetchingModel;
