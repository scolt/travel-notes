import notesModel from './common/ModelNote';
import addImageReduce from './View/components/addImage/ReducerAddImage';
import viewReduce from './View/ReducerNoteView';
import formReduce from './Form/ReducerNoteForm';
import listReduce from './List/ReducerNoteList';
import mapReduce from './Map/ReducerMap';
import galleryReduce from './Gallery/ReducerGallery';
import formReducer from 'common/reducers/formReducer';

const noteReducers = [
    addImageReduce,
    viewReduce,
    listReduce,
    formReduce,
    mapReduce,
    galleryReduce,
    formReducer('notes')
];

function notes(state = notesModel, action) {
    /* TODO: Find a more adequate solution for set model loading inProgress */
    if (action.reqData && action.reqData.model === 'notes') {
        switch (action.type) {
        case 'startProcessing': state.isProcessing = true; break;
        case 'endProcessing': state.isProcessing = false; break;
        case 'errProcessing': state.isProcessing = false; break;
        }
    }

    let candidate = noteReducers.filter(item => {
        return item(state, action);
    }).pop();
    return candidate ? candidate(state, action) : state;
}

export default notes;
