export default function (state, action) {
    if (action.type === 'prepareNotePayload') {
        let {noteForm: editForm} = state;
        editForm = {...editForm, fields: [...editForm.fields]};
        const data = new FormData();

        editForm.fields.forEach(item => {
            if (item.readOnly) return;
            if (item.type === 'file' && !item.value) return;
            if (item.name === 'position') {
                data.append('lat', item.value.lat);
                data.append('lng', item.value.lng);
            } else {
                data.append(item.name, item.value);
            }
        });
        return {...state, payload: data};
    }

    if (action.type === 'changeAddActiveStep') {
        let {noteForm: editForm} = state;
        editForm.currentStep = action.stepIndex;
        return {...state};
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'notes') {
        if (action.reqData.type === 'createNote') {
            let {noteForm: editForm} = state;
            editForm.currentStep = 0;
            Object.keys(editForm.groupValidations).forEach(key => editForm.groupValidations[key] = false);
            editForm.fields.forEach(item => {
                item.value = typeof item.value === 'string' ? '' : {};
            });
            return {...state, ...editForm};
        }
    }

    return false;
}
