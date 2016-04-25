const login = {
    payload: {},

    editForm: {
        isValid: false,

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
    }
};

module.exports = login;
