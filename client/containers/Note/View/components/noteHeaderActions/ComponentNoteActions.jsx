import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import {FloatingActionButton} from 'material-ui';

import restApi from '../../../../../common/actions/restApi';
import withStore from '../../../../../common/components/withStore/withStore';

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
                        <FontAwesomeIcon icon={faEdit}/>
                    </FloatingActionButton>
                </div> :
                <div>
                    <FloatingActionButton secondary={true} disabled={!isValid} style={{marginRight: '10px'}} onTouchTap={this.saveNote}>
                        <FontAwesomeIcon icon={faSave}/>
                    </FloatingActionButton>
                    <FloatingActionButton onTouchTap={this.cancelEditNote}>
                        <FontAwesomeIcon icon={faWindowClose}/>
                    </FloatingActionButton>
                </div>}
        </div>;
    }
});

export default withStore(NoteActions);
