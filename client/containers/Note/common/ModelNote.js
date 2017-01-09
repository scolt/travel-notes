const notes = {
    editMode: false,
    isProcessing: false,
    error: '',

    payload: {},
    note: {
        author: '',
        id: '',
        photos: [],
        position: {},
        subtitle: '',
        text: '',
        title: ''
    },

    images: [],
    markers: [],
    notes: [],

    totalPages: 0,
    filters: {
        page: 1,
        order: {},
        filters: {},
        fields: ''
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
        groupValidations: {
            'step1': false,
            'step2': false,
            'step3': false,
            'step4': false
        },
        prevState: null,
        currentStep: 0,
        fields: [
            {
                type: 'file',
                name: 'file',
                label: 'Avatar',
                validate: /^(?!\s*$).+/,
                dropzoneText: 'Try dropping some files here, or click to select files to upload.',
                group: 'step4',
                value: ''
            },
            {
                type: 'hidden',
                name: 'id',
                label: 'id',
                value: ''
            },
            {
                type: 'hidden',
                name: 'position',
                group: 'step3',
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
                group: 'step1',
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
                group: 'step1',
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
                group: 'step2',
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
