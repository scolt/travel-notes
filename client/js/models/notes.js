const notes = {
    isProcessing: false,
    payload: {},
    note: {},
    markers: [],
    notes: [],
    filters: {
        orderBy: '',
        onlyMy: false
    },
    addImageForm: {
        fields: [{
            type: 'file',
            name: 'file',
            label: 'Avatar',
            dropzoneText: 'Try dropping some files here, or click to select files to upload.',
            value: ''
        }]
    },

    noteForm: {
        isValid: false,
        prevState: null,
        fields: [
            {
                type: 'file',
                name: 'file',
                label: 'Avatar',
                dropzoneText: 'Try dropping some files here, or click to select files to upload.',
                value: ''
            },
            {
                type: 'hidden',
                name: 'position',
                label: 'lng',
                value: {},
                validateObject: true,
                requiredFields: ['lat', 'lng']
            },
            {
                name: 'title',
                label: 'Title',
                hintText: 'Title',
                type: 'text',
                value: '',
                isValid: false,
                isDirty: false,
                validate: /^[\w@.-_]{4,100}$/,
                validationMessage: 'This is required field. ' +
                'Title should contains at least 4 chars. Allowed letters, numbers, @ . - _',
                errorText: null
            },
            {
                name: 'subtitle',
                label: 'Subtitle',
                hintText: 'Subtitle',
                type: 'text',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validationMessage: 'Enter valid value!',
                errorText: null
            },
            {
                name: 'text',
                label: 'Content',
                hintText: 'Content',
                type: 'textarea',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validationMessage: 'Enter valid value!',
                errorText: null
            }
        ],

        buttons: [
            {
                name: 'create',
                label: 'Save',
                disabled: true
            }
        ]
    }
};

export default notes;
