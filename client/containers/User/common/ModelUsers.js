const users = {
    editMode: false,
    payload: {},

    user: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        avatar: '',
        owner: true
    },

    profile: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        birthday: '',
        gender: '',
        skype: '',
        website: '',
        avatar: '',
        background: '',
        about: ''
    },

    loginForm: {
        isValid: false,
        prevState: null,
        fields: [
            {
                name: 'email',
                label: 'Email',
                hintText: 'Email',
                type: 'text',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /.+@.+\..+/i,
                validationMessage: 'This is required field. Please enter valid email in format "email@domain.com".',
                errorText: null
            },
            {
                name: 'password',
                label: 'Password',
                hintText: 'Password',
                type: 'password',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^\w{3,20}$/,
                validationMessage: 'This is required field.',
                errorText: null
            }
        ],

        buttons: [
            {
                name: 'login',
                label: 'Login',
                disabled: true
            }
        ]
    },

    registerForm: {
        isValid: false,

        props: {
            title: 'Add/Edit tag',
            modal: true,
            open: false
        },

        fields: [
            {
                name: '_id',
                readOnly: true,
                type: 'hidden',
                value: ''
            },
            {
                name: 'firstName',
                label: 'First Name',
                hintText: 'First Name',
                type: 'text',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^[A-Za-z]{1,50}$/,
                validationMessage: 'This is required field. Allowed only letters.',
                errorText: null
            },
            {
                name: 'lastName',
                label: 'Last Name',
                hintText: 'Last Name',
                type: 'text',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validationMessage: 'Enter valid value!',
                errorText: null
            },
            {
                name: 'email',
                label: 'Email',
                hintText: 'Email',
                type: 'text',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /.+@.+\..+/i,
                validationMessage: 'This is required field. Please enter valid email in format "email@domain.com".',
                errorText: null
            },
            {
                name: 'username',
                label: 'Username',
                hintText: 'Username',
                type: 'text',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^[\w-]{4,100}$/,
                validationMessage: 'This is required field. Username should contains at least 4 chars.  Allowed letters, numbers, -',
                errorText: null
            },
            {
                name: 'password',
                label: 'Password',
                hintText: 'Password',
                type: 'password',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^[\w@.-_]{4,20}$/,
                validationMessage: 'This is required field. ' +
                'Password should contains at least 4 chars and max length is 20. Allowed letters, numbers, @ . - _',
                errorText: null
            },
            {
                name: 'birthday',
                label: 'Birthday',
                hintText: 'Birthday',
                type: 'date',
                value: ''
            },
            {
                name: 'gender',
                label: 'Gender',
                hintText: 'Gender',
                type: 'radio',
                values: ['Male', 'Female'],
                value: 'Male'
            },
            {
                name: 'skype',
                label: 'Skype',
                hintText: 'Skype',
                type: 'text',
                value: ''
            },
            {
                name: 'website',
                label: 'Website',
                hintText: 'Website',
                type: 'text',
                value: ''
            },
            {
                name: 'about',
                label: 'About Me',
                hintText: 'About Me',
                type: 'textarea',
                value: ''
            },
            {
                type: 'file',
                name: 'avatar',
                label: 'Avatar',
                dropzoneText: 'Upload your avatar',
                value: ''
            },
            {
                type: 'file',
                name: 'background',
                label: 'BG',
                dropzoneText: 'Upload your profile background image.',
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

export default users;
