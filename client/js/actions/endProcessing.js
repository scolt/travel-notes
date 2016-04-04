'use strict';

function endProcessing(data) {
    return {
        type: 'endProcessing',
        data
    };
}

module.exports = endProcessing;
