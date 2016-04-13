'use strict';

function errProcessing(err) {
    return {
        type: 'errProcessing',
        err
    };
}

module.exports = errProcessing;
