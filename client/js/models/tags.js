'use strict';

const tags = {
    rowsOnPageSelector: {
        value: 5,
        opts: [
            {name:'5', value: 5},
            {name:'10', value: 10},
            {name:'100', value: 100}
        ]
    },

    table: {
        order: [{field: 'name', sort: 'asc'}],
        fields: {},
        filters: {},
        page: 1,
        pages: 1,
        ct: 0,
        selectedRow: undefined,
        props: {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: false
        },

        columns: [
            {
                name: '_id',
                label: 'Id',
                tooltip: 'Tag Id'
            },
            {
                name: 'name',
                label: 'Name',
                tooltip: 'Tag Name'
            }
        ],

        rows: []
    },

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
                name: '_id',
                label: 'Id',
                value: '',
                readOnly: true,
                isValid: true
            },
            {
                name: 'name',
                label: 'Tag Name',
                hintText: 'Enter tag name',
                value: '',
                isValid: false,
                isDirty: false,
                isTouch: false,
                validate: /^\w{1,10}$/,
                validationMessage: 'Enter valid value!',
                errorText: null
            }
        ],

        buttons: [
            {
                name: 'cansel',
                label: 'Cansel'
            },

            {
                name: 'submit',
                label: 'Submit',
                disabled: true
            }
        ]
    }
};

module.exports = tags;
