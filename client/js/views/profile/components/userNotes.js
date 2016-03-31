'use strict';

import React from 'react';
import Map from 'components/map/Map';
import Icon from 'react-fa';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import storeMixin from 'mixins/storeMixin';

let userNotes = React.createClass({

    render() {
        return (
            <div className="row">
                <Table
                    height="255px"
                    fixedHeader={true}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Subname">Subname</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}>
                        {this.props.notes.map( (row, index) => (
                            <TableRow key={index} >
                                <TableRowColumn>{row.title}</TableRowColumn>
                                <TableRowColumn>{row.subtitle}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
});

module.exports = userNotes;
