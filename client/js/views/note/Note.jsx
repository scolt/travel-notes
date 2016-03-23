'use strict';

let React = require('react');
let Card = require('material-ui/lib/card/card');
let CardTitle = require('material-ui/lib/card/card-title');
let CardText = require('material-ui/lib/card/card-text');
let Map = require('components/map/Map');
import './note.styl';

let Note = React.createClass({
    render() {
        var noteTitlePic = 'http://www.cornerstone-group.com/wp-content/uploads/2013/05/EMEA-athens.jpg';
        var noteText = 'Athens is the capital and largest city of Greece. Athens dominates the Attica region and ' +
            'is one of the worlds oldest cities, with its recorded history spanning around 3,400 years, and the ' +
            'earliest human presence started somewhere between the 11th and 7th millennium BC';
        var coordinates = {
            lat: 37.9908164,
            lng: 23.6682993
        };
        var noteMarker = {
            position: {
                lat: coordinates.lat,
                lng: coordinates.lng
            },
            title: 'Athens'
        };
        var markers = [];

        markers.push(noteMarker);

        return (
            <Card>
                <CardTitle title="Trip to Athens" subtitle="The cradle of the European civilization" />
                <CardText>
                    <div className="row">
                        <div className="note-photo col-xs-12 col-md-6">
                            <img src={noteTitlePic} />
                        </div>
                        <div className="note-map col-xs-12 col-md-6">
                            <Map markers={markers} center={coordinates}/>
                        </div>
                    </div>
                    <div>{noteText}</div>
                </CardText>
            </Card>
        );
    }
});

module.exports = Note;
