'use strict';

let request = require('superagent');

let getNote = function getNote(noteId) {
    return dispatch => {
        dispatch({type: 'startFetchingNote'});

        return request
                .post('/restApi/notes.json/read/' + noteId)
                .send()
                .set('Accept', 'application/json')
                .end((err, res) => dispatch({type: 'endFetchingNote', err, res}));
    };
};

module.exports = getNote;
