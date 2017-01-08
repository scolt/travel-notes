import React from 'react';
import Icon from 'react-fa';
import {FloatingActionButton} from 'material-ui';

import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';

const NoteActions = React.createClass({
    cancelEditNote() {
        this.props.store.dispatch({
            type: 'disableEditMode'
        });
    },

    componentWillUnmount() {
        this.cancelEditNote();
    },

    prepareEditNote() {
        const noteId = this.props.data.notes.note._id;
        this.props.store.dispatch({
            type: 'enableEditMode',
            id: noteId
        });
    },

    saveNote() {
        this.props.store.dispatch({
            type: 'prepareNotePayload'
        });
        this.props.store.dispatch(restApi({
            model: 'notes',
            action: 'update',
            type: 'updateNote'
        }));
    },

    render() {
        const isEditMode = this.props.isEditMode;
        return <div className="actions">
            {!isEditMode ?
                <div>
                    <FloatingActionButton mini={true} primary={true} onClick={this.prepareEditNote}>
                        <Icon name="pencil"/>
                    </FloatingActionButton>
                </div> :
                <div>
                    <FloatingActionButton mini={true} secondary={true} style={{marginRight: '10px'}} onClick={this.saveNote}>
                        <Icon name="floppy-o"/>
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} primary={true} onClick={this.cancelEditNote}>
                        <Icon name="times"/>
                    </FloatingActionButton>
                </div>}
        </div>;
    }
});

export default withStore(NoteActions);
