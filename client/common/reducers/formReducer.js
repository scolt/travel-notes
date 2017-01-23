export default function (modelName) {
    return function (state, action) {
        if (action.type === 'onChangeFormField' && action.model === modelName) {
            const {name, value, formName} = action;
            let editForm = state[formName];
            if (!editForm) return state;
            editForm = {...editForm, fields: [...editForm.fields]};
            const i = editForm.fields.reduce((result, field, i) =>
                result === null || field.name === name ? i : result, null);

            const field = editForm.fields[i];
            field.value = value;
            field.isDirty = true;

            let error = false;

            const validationGroups = {};

            editForm.fields = editForm.fields.map(item => {
                if (item.validateObject) {
                    item.isValid = true;
                    item.requiredFields.forEach(key => {
                        if (!item.value[key]) {
                            if (item.group) {
                                validationGroups[item.group] = true;
                            }
                            item.isValid = false;
                            error = true;
                        }
                    });
                }

                if (item.validate) {
                    item.isValid = item.validate.test(item.value);
                    if (!item.isValid) {
                        if (item.group) {
                            validationGroups[item.group] = true;
                        }
                        error = true;
                    }
                    item.errorText = !item.isValid && (item.isDirty || item.isTouch) ? item.validationMessage : null;
                }
                return item;
            });

            if (editForm.groupValidations) {
                Object.keys(editForm.groupValidations).forEach(key => {
                    editForm.groupValidations[key] = !validationGroups[key];
                });
            }

            editForm.isValid = !error;
            state[formName] = editForm;
            return {...state};
        }
        return false;
    };
}
