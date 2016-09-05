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
        let card = <Card>
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
        </Card>;

        return (
            <div>
                {!note.position ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : card}
            </div>
        );
    }
});

module.exports = Note;
