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
        const isValid = this.props.data.notes.noteForm.isValid;
        return <div className="actions">
            {!isEditMode ?
                <div>
                    <FloatingActionButton onTouchTap={this.prepareEditNote}>
                        <Icon name="pencil"/>
                    </FloatingActionButton>
                </div> :
                <div>
                    <FloatingActionButton secondary={true} disabled={!isValid} style={{marginRight: '10px'}} onTouchTap={this.saveNote}>
                        <Icon name="floppy-o"/>
                    </FloatingActionButton>
                    <FloatingActionButton onTouchTap={this.cancelEditNote}>
                        <Icon name="times"/>
                    </FloatingActionButton>
                </div>}
        </div>;
    }
});

export default withStore(NoteActions);
