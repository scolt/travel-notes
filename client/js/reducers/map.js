'use strict';

const notesModel = require('models/notes');

function map(state = notesModel, action) {
    if (action.type === 'startProcessing' && action.data.reducer === 'map') {
        const isProcessing = true;
        return {...state, isProcessing};
    }


    if (action.type === 'endProcessing' && action.data.reducer === 'map') {
        const isProcessing = false;
        return {...state, isProcessing, markers: action.data.body.result.map(item =>
            ({
                window: {
                    descr: item.text,
                    title: item.title,
                    link: `/#/note/${item._id}`,
                    photo: item.photo
                },
                position: {
                    lng: item.lng,
                    lat: item.lat
                }
            })
        )};
    }

    return state;
}

module.exports = map;
