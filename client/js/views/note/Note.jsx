import './note.styl';

import React from 'react';
import Icon from 'react-fa';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui';
import {Gallery} from 'components/gallery/Gallery';
import Dropzone from 'react-dropzone';
import Map from 'components/map/Map';
import restApi from 'actions/restApi';
import storeMixin from 'mixins/storeMixin';

const Note = React.createClass({
    mixins: [storeMixin],

    componentWillMount() {
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            id: this.props.params.id,
            type: 'prepareNote'
        }));
    },

    onDrop(files) {
        this.store.dispatch(
            {type: 'onAdditionalImageSet', name: 'file', value: files[0]});
    },

    uploadImage(e) {
        e.stopPropagation();
        this.store.dispatch({type: 'preparePayloadForAdditionalImage'});
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            action: 'addImage',
            type: 'addImage'
        }));
    },

    render() {
        const note = this.state.notes.note;
        const userId = this.state.users.user.username;
        const addImageFormField = this.state.notes.addImageForm.fields[0];
        const tilesData = note.photos && note.photos.map(photo => ({ img: photo}));

        let card =
            <div className="row">
                <div className="note-background">
                    <img className="note-background-image"  src={note.photos && note.photos[0]}/>
                    <div className="col-sm-8 col-xs-12 note-container">
                        <Card style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                            <CardMedia
                                overlay={<CardTitle title={note.title} subtitle={note.subtitle} />}
                            >
                                <div className="header-image"></div>
                            </CardMedia>
                            <CardText style={{background: '#fff'}}>
                                <Map className="map-in-card" markers={[{position: note.position, title: note.title}]} center={note.position}/>
                                <div className="note-text">{note.text}</div>
                                <div className="sign">{note.author}</div>
                                {this.state.net.isProcessing ?
                                    <div className="spinner"><Icon name="circle-o-notch" spin/></div> :
                                    <Gallery images={tilesData}
                                         appendAfter={ note.author === userId ?
                                            <Dropzone onDrop={this.onDrop}
                                                      className="col-33-custom gallery-item drop-zone"
                                                      activeClassName="active"
                                                      accept="image/*">
                                                <div className="drop-zone-sq">
                                                    <strong>Add New Image</strong>
                                                    {addImageFormField.value ? <img src={addImageFormField.value.preview}/> : null}
                                                    {addImageFormField.value ? <div className="submit-drop" onClick={this.uploadImage}>Upload</div> : null}
                                                </div>
                                            </Dropzone> : null
                                         }
                                />}
                            </CardText>
                        </Card>
                    </div>
                </div>
            </div>;

        return (
            <div>
                {!note.position ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : card}
            </div>
        );
    }
});

export default Note;
