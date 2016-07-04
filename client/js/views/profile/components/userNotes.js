'use strict';

import React from 'react';
import Icon from 'react-fa';
import {Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn,TableBody} from 'material-ui/lib';

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
