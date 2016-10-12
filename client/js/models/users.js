'use strict';

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
        avatar: ''
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
                validationMessage: 'Enter valid value!',
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
                validate: /^\w{1,20}$/,
                validationMessage: 'Enter valid value!',
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

    editForm: {
        isValid: false,
        enableEditMode: false,

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
                type: 'text',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^\w{1,50}$/,
                validationMessage: 'Enter valid value!',
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
                validationMessage: 'Enter valid value!',
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
                validate: /^\w{1,20}$/,
                validationMessage: 'Enter valid value!',
                errorText: null
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
                name: 'firstName',
                label: 'First Name',
                hintText: 'First Name',
                type: 'text',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^\w{1,50}$/,
                validationMessage: 'Enter valid value!',
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
                validationMessage: 'Enter valid value!',
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
                validate: /^\w{1,20}$/,
                validationMessage: 'Enter valid value!',
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
                validate: /^\w{1,20}$/,
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

module.exports = users;
