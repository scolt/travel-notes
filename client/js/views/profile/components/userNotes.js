import React from 'react';
import {Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody, Card, CardTitle, CardText} from 'material-ui';
import storeMixin from 'mixins/storeMixin';
import restApi from 'actions/restApi';

const userNotes = React.createClass({
    mixins: [
        storeMixin
    ],

    componentWillMount() {
        let filters = {'userId': this.props.user};
        this.store.dispatch({type: 'prepareNoteFilterPayload',
            currentUserID: this.state.users.user.username,
            filters: filters,
            updated: 'filters'});

        this.request = this.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    render() {
        return (
            <Card>
                <CardTitle
                    title="User's notes"
                    className="user-profile-header"
                    style={{paddingRight: '70px', paddingBottom: 0}}
                >
                </CardTitle>
                <CardText className="row" style={{paddingTop: 0}}>
                    <Table
                        height="200px"
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
                            {this.state.notes.notes.map( (row, index) => (
                                <TableRow key={index} >
                                    <TableRowColumn>{row.title}</TableRowColumn>
                                    <TableRowColumn>{row.subtitle}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardText>
            </Card>
        );
    }
});

export default userNotes;
