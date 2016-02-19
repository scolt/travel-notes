// http://eslint.org/
module.exports = {
    parser: 'babel-eslint',

    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },

    env: {
        browser: true,
        node: true,
        jasmine: true
    },

    plugins: [
        'react'
    ],

    // http://eslint.org/docs/rules/
    rules: {
        // Possible Errors
        'comma-dangle': [2, 'never'], // disallow or enforce trailing commas
        'no-cond-assign': [2, 'except-parens'], // disallow assignment in conditional expressions
        'no-debugger': 2, // disallow use of debugger
        'no-dupe-args': 2, // disallow duplicate arguments in functions
        'no-dupe-keys': 2, // disallow duplicate keys when creating object literals
        'no-duplicate-case': 2, // disallow a duplicate case label
        'no-extra-semi': 2, // disallow unnecessary semicolons
        'no-invalid-regexp': 2, // no-invalid-regexp
        'valid-typeof': 2, // ensure that the results of typeof are compared against a valid string
        'no-console': 1, // disallow use of console in the node environment

        // Variables
        'no-undef': 2, // disallow use of undeclared variables
        'no-unused-vars': 0, //disallow declaration of variables that are not used in the code

        // Stylistic Issues
        semi: [2, 'always'], // require or disallow use of semicolons instead of ASI
        'jsx-quotes': [1, 'prefer-double'], // specify whether double or single quotes should be used in JSX attributes
        indent: [1, 4], // specify tab or space width for your code
        quotes: [1, 'single'] // specify whether backticks, double or single quotes should be used
    }
};
