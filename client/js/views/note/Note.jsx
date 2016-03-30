'use strict';

let React = require('react');
let Card = require('material-ui/lib/card/card');
let CardTitle = require('material-ui/lib/card/card-title');
let CardText = require('material-ui/lib/card/card-text');
let Map = require('components/map/Map');
import store from 'store';
import getNote from 'actions/getNote';
import './note.styl';

let Note = React.createClass({
    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        store.dispatch(getNote(this.props.params.id));
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    handleStoreChange() {
        let state = this.store.getState();
        this.setState(state);
    },

    processNote(note = []) {
        return note.map(item => {
            return item;
        });
    },

    render() {
        let noteInfo = this.state.note;
        let note = this.processNote(noteInfo.data);

        return (
            <Card>
                <CardTitle title={noteInfo.isFetching ? '' : note[0].title} subtitle={noteInfo.isFetching ? '' : note[0].subtitle} />
                <CardText>
                    <div className="row" >
                        <div className="note-photo col-xs-12 col-md-6">
                            <img src={noteInfo.isFetching ? '' : note[0].photo} />
                        </div>
                        <div className="note-map col-xs-12 col-md-6">
                            {noteInfo.isFetching ? '' :  <Map markers={[{position: note[0].position, title: note[0].title}]} center={note[0].position}/>}
                        </div>
                    </div>
                    <div>{noteInfo.isFetching ? '' : note[0].descr}</div>
                </CardText>
            </Card>
        );
    }
});

module.exports = Note;
