'use strict';

let React = require('react');

let {Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody} = require('material-ui');
let {Toolbar, ToolbarGroup, ToolbarTitle, FlatButton} = require('material-ui');
let {SelectField, MenuItem, TextField, Dialog} = require('material-ui');

let storeMixin = require('mixins/storeMixin');

let restApi = require('actions/restApi');

let readAction = () => (
    restApi({
        model: 'tags',
        action: 'read',
        reducer: 'tags'
    })
);

let Tags = React.createClass({
    mixins: [
        storeMixin
    ],

    afterComponentWillMount() {
        this.request = this.store.dispatch(readAction());
    },

    onRowSelection(selectedRows) {
        this.store.dispatch({type: 'setTagsSelectedRow', selectedRow: selectedRows[0]});
    },

    onTouchTapPrev() {
        this.store.dispatch({type: 'decTagsPage'});
        this.request = this.store.dispatch(readAction());
    },

    onTouchTapNext() {
        this.store.dispatch({type: 'incTagsPage'});
        this.request = this.store.dispatch(readAction());
    },

    onTouchTapSort() {
        this.store.dispatch({type: 'sortTags'});
        this.request = this.store.dispatch(readAction());
    },

    onRowsOnPageSelectorChange(e, i, value) {
        this.store.dispatch({type: 'changeTagsRowsOnPage', value});
        this.request = this.store.dispatch(readAction());
    },

    onChangeFilter(e) {
        this.store.dispatch({type: 'changeTagsFilter', value: e.target.value});
    },

    onTouchTapSearch() {
        this.request = this.store.dispatch(readAction());
    },

    onTouchTapDel() {
        let table = this.store.getState().tags.table;
        this.request = this.store.dispatch(restApi({
            model: 'tags',
            action: 'del',
            reducer: 'tags',
            id: table.rows[table.selectedRow]._id
        }));
    },

    onTouchTapCreate() {
        this.store.dispatch({type: 'createTag'});
    },

    onTouchTapUpdate() {
        this.store.dispatch({type: 'updateTag'});
    },

    onTouchTapEditFormButton(name, e) {
        let {table, editForm} = this.store.getState().tags;

        if (name === 'cansel') return this.store.dispatch({type: 'canselTagsEditForm'});
        if (name === 'submit') {
            this.request = this.store.dispatch(restApi({
                model: 'tags',
                action: editForm.action,
                reducer: 'tags',
                id: editForm.action === 'update' ? table.rows[table.selectedRow]._id : undefined
            }));
            return;
        }
    },

    onChangeEditFormField(e) {
        let {name, value} = e.target;
        this.store.dispatch({type: 'changeTagsEditFormField', name, value});
    },

    onBlurEditFormField(e) {
        let {name, value} = e.target;
        this.store.dispatch({type: 'blurTagsEditFormField', name, value});
    },

    render() {
        let table = this.state.tags.table;
        let rowsOnPageSelector = this.state.tags.rowsOnPageSelector;
        let editForm = this.state.tags.editForm;

        return (
            <div>
                {this.state.net.isProcessing ? <span>Loading...</span> : null}

                <div>
                    <SelectField value={rowsOnPageSelector.value} onChange={this.onRowsOnPageSelectorChange}>
                        {rowsOnPageSelector.opts.map((option, i) =>
                            <MenuItem key={i} value={option.value} primaryText={option.name}/>
                        )}
                    </SelectField>
                    <FlatButton onTouchTap={this.onTouchTapSort} label="Sort" secondary={true}/><br/>
                    <TextField onChange={this.onChangeFilter}/>
                    <FlatButton onTouchTap={this.onTouchTapSearch} label="Search" secondary={true}/><br/>
                    <FlatButton onTouchTap={this.onTouchTapCreate} label="Add" secondary={true}/>
                    <FlatButton onTouchTap={this.onTouchTapUpdate} label="Edit" secondary={true} disabled={table.selectedRow === undefined}/>
                    <FlatButton onTouchTap={this.onTouchTapDel} label="Delete" secondary={true} disabled={table.selectedRow === undefined}/>
                </div>

                <Table {...table.props} onRowSelection={this.onRowSelection}>
                    <TableHeader>
                        <TableRow>
                            {table.columns.map((column, i) =>
                                <TableHeaderColumn key={i} tooltip={column.tooltip}>{column.label}</TableHeaderColumn>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody {...table.props}>
                        {table.rows.map( (row, i) => (
                            <TableRow key={i} selected={row.selected}>
                                {table.columns.map((column, i) =>
                                    <TableRowColumn key={i}>{row[column.name]}</TableRowColumn>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Toolbar>
                    <ToolbarGroup firstChild={true} float="left">
                        <FlatButton onTouchTap={this.onTouchTapPrev} label="Prev" secondary={true} disabled={table.page === 1}/>
                        <ToolbarTitle text={`Page: ${table.page}`} />
                        <FlatButton onTouchTap={this.onTouchTapNext} label="Next" secondary={true} disabled={table.page === table.pages}/>
                        <ToolbarTitle text={`Pages: ${table.pages}`} />
                        <ToolbarTitle text={`Records: ${table.ct}`} />
                    </ToolbarGroup>
                </Toolbar>

                <Dialog {...editForm.props}>
                    {editForm.fields.map((field, i) =>
                        (<div key={i}>
                            <TextField
                                name={field.name}
                                disabled={field.readOnly}
                                hintText={field.hintText}
                                errorText={field.errorText}
                                defaultValue={field.defaultValue}
                                onChange={this.onChangeEditFormField}
                                onBlur={this.onBlurEditFormField}/><br/></div>)
                    )}
                    <br/>
                    {editForm.buttons.map((button, i) =>
                        <FlatButton
                            key={i}
                            name={button.name}
                            disabled={button.disabled}
                            label={button.label}
                            secondary={true}
                            onTouchTap={this.onTouchTapEditFormButton.bind(this, button.name)}/>
                    )}
                </Dialog>
            </div>
        );
    }
});

module.exports = Tags;
