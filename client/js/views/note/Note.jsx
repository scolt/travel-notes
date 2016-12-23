'use strict';

import './note.styl';

import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui';
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

        let card = <div className="note-entity">
            <div className="note-header">
                <img src={note.photo} />
                <div className="titles">
                    <h1>{note.title}</h1>
                    <p>{note.subtitle}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    {note.text}
                    <div className="sign">{note.author}</div>
                </div>
                <div className="col-md-6 col-xs-12">
                    <Map markers={[{position: note.position, title: note.title}]} center={note.position}/>
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
