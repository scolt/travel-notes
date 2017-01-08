import React from 'react';
import Icon from 'react-fa';

import AddImageButton from './components/addImage/ComponentAddImage';
import NoteEntity from './components/noteEntity/ComponentNoteEntity';
import Gallery from 'common/components/gallery/Gallery';
import restApi from 'common/actions/restApi';
import withStore from 'common/components/withStore/withStore';

import './styl/noteView.styl';

const Note = React.createClass({

    componentWillMount() {
        this.props.store.dispatch(restApi({
            model: 'notes',
            id: this.props.params.id,
            type: 'prepareNote'
        }));
    },

    render() {
        const isLoading = this.props.data.notes.isProcessing;
        const note = this.props.data.notes.note;
        const isOwner = this.props.data.users.user.username === note.author;
        const tilesData = note.photos && note.photos.map(photo => ({ src: photo}));

        let card = <NoteEntity
                bgPhoto={note.photos && note.photos[0]}
                title={note.title}
                subtitle={note.subtitle}
                isOwner={isOwner}>
            <div className="sign">{note.author}</div>
            <Gallery
                images={tilesData}
                appendAfter={isOwner ? <AddImageButton /> : null}
            />
        </NoteEntity>;


        return (
            <div>
                {isLoading ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : card}
            </div>
        );
    }
});

export default withStore(Note);
