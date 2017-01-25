/* Temporary helpers: NOTE_VIEW-1 */
const prepareNote = note => ({
    id: note['_id'],
    title: note.title,
    subtitle: note.subtitle,
    text: note.text,
    author: note.userId,
    photos: note.photos,
    position: {
        lng: parseFloat(note.lng),
        lat: parseFloat(note.lat)
    }
});

export default function (state, action) {
    if (action.type === 'disableEditMode') {
        const editMode = false;
        return {...state, editMode};
    }

    if (action.type === 'enableEditMode') {
        let {noteForm, note, editMode} = state;
        editMode = true;
        for (let field of noteForm.fields) {
            field.value = note[field.name] || field.value;
            if (field.type === 'file') field.value = 'string-value';
        }
        noteForm.isValid = true;
        return {...state, editMode};
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'notes') {

        if (action.reqData.type === 'prepareNote') {
            return {...state, note: action.resData.result.map(prepareNote)[0]};
        }

        if (action.reqData.type === 'updateNote') {
            const editMode = false;
            return {...state, editMode, note: prepareNote(action.resData)};
        }
    }

    return false;
}
