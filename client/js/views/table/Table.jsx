'use strict';

let React = require('react');

let Table = require('material-ui/lib/table/table');
let TableHeaderColumn = require('material-ui/lib/table/table-header-column');
let TableRow = require('material-ui/lib/table/table-row');
let TableHeader = require('material-ui/lib/table/table-header');
let TableRowColumn = require('material-ui/lib/table/table-row-column');
let TableBody = require('material-ui/lib/table/table-body');
let RaisedButton = require('material-ui/lib/raised-button');

let store= require('store');
let fetchTable = require('actions/fetchTable');

const style = {
    margin: 12
};

let TableView = React.createClass({
    getInitialState() {
        return {};
    },

    componentWillMount() {
        this.unSubscribe = store.subscribe(this.onChangeStore);
        let {page} = store.getState().table;
        store.dispatch(fetchTable(page));
    },

    componentWillUnMount() {
        this.unSubscribe();
    },

    onChangeStore() {
        let state = store.getState();
        this.setState(state);
    },

    nextPage() {
        let {page} = store.getState().table;
        store.dispatch(fetchTable(++page));
    },

    prevPage() {
        let {page} = store.getState().table;
        store.dispatch(fetchTable(--page));
    },

    render() {
        let table = this.state.table;
        return (
          <div>
            {table.isFetching ? <strong>Loading...</strong> : null}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {table.rows.map(tableRow =>
                        <TableRow key={tableRow.id}>
                            <TableRowColumn>{tableRow.id}</TableRowColumn>
                            <TableRowColumn>{tableRow.name}</TableRowColumn>
                            <TableRowColumn>{tableRow.status}</TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
             </Table>
             <RaisedButton label="Prev" onTouchTap={this.prevPage} style={style} disabled={table.isFetching}/>
             <RaisedButton label={`Page: ${this.state.table.page}`} style={style}/>
             <RaisedButton label="Next" onTouchTap={this.nextPage} style={style} disabled={table.isFetching}/>
          </div>
        );
    }
});

module.exports = TableView;
