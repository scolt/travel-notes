'use strict';

import './note.styl';

import React from 'react';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui';
import {Gallery} from 'components/gallery/Gallery';
import Icon from 'react-fa';

import Map from 'components/map/Map';

import restApi from 'actions/restApi';
import storeMixin from 'mixins/storeMixin';

let Note = React.createClass({
    mixins: [storeMixin],

    componentWillMount() {
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            id: this.props.params.id,
            type: 'prepareNote'
        }));
    },

    render() {
        const note = this.state.notes.note;
        const tilesData = [{
            img: note.photo
        }];

        let card =
            <div className="row">
                <div className="note-background">
                    <img className="note-background-image"  src={note.photo}/>
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
                                <Gallery images={tilesData}/>
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

module.exports = Note;
