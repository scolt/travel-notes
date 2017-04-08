import React from 'react';
import withStore from 'common/components/withStore/withStore';
import restApi from 'common/actions/restApi';

import './noteGrid.styl';

const NoteGrid = React.createClass({
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

    render() {
        const notes = this.props.data.notes.notes;
        const currentUsername = this.props.data.users.user.username;
        const list = <div className="notes-grid">
            {this.props.appendBefore}
            {notes.map((tile, i) =>
                <a key={i} className="note-grid-item" data-index={`note-index-${i}`} href={`#/note/${tile._id}`}>
                    {tile.userId === currentUsername ?
                        <i className="fa fa-trash" onClick={e => e.preventDefault()} onTouchTap={(e) => this.deleteNote(e, tile._id)}>&nbsp;</i> : null
                    }
                    <img src={tile.photos && tile.photos[0]} />
                    <div className="note-grid-metadata">
                        <div className="title">
                            {tile.title}
                        </div>
                        <div className="subtitle">
                            {tile.subtitle}
                        </div>
                    </div>
                </a>)
            }
        </div>;

        const noResults = <div className="notes-grid">
            {this.props.appendBefore}
            <a className="note-grid-item no-results" onTouchTap={this.props.reloadList}>
                <div className="text-wrapper">
                    <p>There are 0 results according to your filter. Please try update filter or change the page.</p>
                    <p>Press here for reset all filters and reload.</p>
                </div>
            </a>
        </div>;

        return <div>
            {notes.length ? list : noResults}
        </div>;
    }
});

export default withStore(NoteGrid);
