'use strict';

import './note.styl';

import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui';

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
        if (this.state.net.isProcessing) return null;
        const note = this.state.notes.note;

        return (
            <Card>
                <CardTitle title={note.title} subtitle={note.subtitle} />
                <CardText>
                    <div className="row" >
                        <div className="note-photo col-xs-12 col-md-6">
                            <img src={note.photo} />
                        </div>
                        <div className="note-map col-xs-12 col-md-6">
                            <Map markers={[{position: note.position, title: note.title}]} center={note.position}/>
                        </div>
                    </div>
                    <div>{note.text}</div>
                </CardText>
            </Card>
        );
    }
});

module.exports = Note;
