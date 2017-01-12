import React from 'react';
import {Paper, Subheader, ListItem, List, Avatar, ActionInfo} from 'material-ui';

import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';
import Pagination from '../../../../Note/List/components/pagination/ComponentNotePagination';

const UserNotes = React.createClass({
    loadNotes() {
        this.props.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    deleteNote(e, id) {
        e.preventDefault();
        this.props.store.dispatch({
            type: 'openAlert',
            alertType: 'warning',
            title: 'Delete Note',
            message: 'Are you sure that you want to delete this note?',
            showCancelButton: true,
            beforeConfirm: () => {
                this.props.store.dispatch(restApi({
                    type: 'deleteOneNote',
                    model: 'notes',
                    action: 'delete',
                    id: id
                }));
            }
        });
    },

    componentWillMount() {
        this.props.store.dispatch({
            type: 'updateFilter',
            filters: {
                userId: this.props.userId
            }
        });
        this.loadNotes();
    },

    render() {
        const notes = this.props.data.notes.notes;
        const owner = this.props.data.users.profile.owner;
        return <Paper>
            <Subheader>Notes</Subheader>
            <List>
                {notes.map(item => <a href={`#/note/${item._id}`} key={item._id}><ListItem
                    leftAvatar={<Avatar src={item.photos[0]} />}
                    primaryText={item.title}
                    rightIcon={owner ? <span className="fa fa-trash" onClick={e => this.deleteNote(e, item._id)}>&nbsp;</span> : null}
                    secondaryText={new Date(item.created).toString().split(' GMT')[0]}
                /></a>)}
            </List>
            <Pagination onChange={this.loadNotes}/>
        </Paper>;
    }
});

export default withStore(UserNotes);
