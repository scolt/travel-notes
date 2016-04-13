'use strict';

function startProcessing(data) {
    return {
        type: 'startProcessing',
        data
    };
}

module.exports = startProcessing;
