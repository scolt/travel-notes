export default function (state, action) {
    if (action.type === 'onAdditionalImageSet') {
        const {value} = action;
        const {addImageForm} = state;
        addImageForm.fields[0].value = value;
        return {...state};
    }

    if (action.type === 'preparePayloadForAdditionalImage') {
        const data = new FormData();
        const field = state.addImageForm.fields[0];
        data.append('id', state.note.id);
        data.append(field.name, field.value);
        return {...state, payload: data};
    }

    return null;
}
