import React from 'react';
import Icon from 'react-fa';

import withStore from 'common/components/withStore/withStore';

import './addNewNoteButton.styl';

const addNewNoteButton = React.createClass({
    render() {
        const template = this.props.data.users.user.email ?
            <a key="add" className="note-grid-item add" href={`#/note/create`}>
                <span className="add-wrapper">
                    <Icon name="plus"/>
                </span>
            </a> : null;
        return template;
    }
});

export default withStore(addNewNoteButton);
