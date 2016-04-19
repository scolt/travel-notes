const register = {
    payload: {},

    editForm: {
        isValid: false,

        props: {
            title: 'Add/Edit tag',
            modal: true,
            open: false
        },

        fields: [
            {
                name: 'firstName',
                label: 'First Name',
                hintText: 'First Name',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^\w{1,10}$/,
                validationMessage: 'Enter valid value!',
                errorText: null
            },
            {
                name: 'lastName',
                label: 'Last Name',
                hintText: 'Last Name',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^\w{1,10}$/,
                validationMessage: 'Enter valid value!',
                errorText: null
            },
            {
                name: 'email',
                label: 'Email',
                hintText: 'Email',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^\w{1,10}$/,
                validationMessage: 'Enter valid value!',
                errorText: null
            },
            {
                name: 'username',
                label: 'Username',
                hintText: 'Username',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^\w{1,10}$/,
                validationMessage: 'Enter valid value!',
                errorText: null
            },{
                type: 'file',
                name: 'file',
                label: 'Avatar',
                dropzoneText: 'Try dropping some files here, or click to select files to upload.',
                value: ''
            }
        ],

        buttons: [
            {
                name: 'register',
                label: 'Register',
                disabled: true
            }
        ]
    }
};

module.exports = register;
