'use strict';

import React from 'react';
import Icon from 'react-fa';
import {GridList, GridTile, SelectField, MenuItem} from 'material-ui';

import restApi from 'actions/restApi';

import storeMixin from 'mixins/storeMixin';
import mock1 from 'mock1.jpg';
import mock2 from 'mock2.jpg';
import mock3 from 'mock3.jpg';
import mock4 from 'mock4.jpg';
import mock5 from 'mock5.jpg';
import mock6 from 'mock6.jpg';

let styles = {
    root: {
        width: '100%'
    },
    gridList: {
        width: '90%',
        margin: '0 auto',
        marginBottom: 24
    },
    filter: {
        margin: '0 auto',
        maxWidth: '600'
    }
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MainPage = React.createClass({
    mixins: [storeMixin],

    componentWillMount() {
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    authorSelect(e, index, value) {
        let filters = value !== 'all' ? {filters: {'userId': value}} : {};
        this.state.author = value;
        this.store.dispatch({type: 'prepareNoteFilterPayload', ...filters});
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    render() {
        let authors = [];
        let columnsCount = Math.ceil(window.innerWidth / 300);

        if (this.state.users.user.username) {
            authors.push(<MenuItem key={1} value={this.state.users.user.username} primaryText="Only My" />);
        }

        authors = authors.concat([
            <MenuItem key={2} value={"all"} primaryText="All" />
        ]);

        return (
            <div className="row">
                <div classNam="filters" style={styles.filter}>
                    <SelectField
                        value={this.state.author}
                        onChange={this.authorSelect}
                        floatingLabelText="Author"
                    >
                        {authors}
                    </SelectField>
                </div>
                <div style={styles.root}>
                    <GridList
                        cols={columnsCount}
                        cellHeight={200}
                        padding={1}
                        style={styles.gridList}
                    >
                        {this.state.notes.notes.map((tile) => (
                            <a href={`#/note/${tile._id}`}>
                                <GridTile
                                    key={tile._id}
                                    title={tile.title}
                                    subtitle={<span>by <b>{tile.userId}</b></span>}
                                    actionPosition="left"
                                    titlePosition="bottom"
                                    cols={tile.featured ? 2 : 1}
                                    rows={tile.featured ? 2 : 1}
                                >
                                    <img src={tile.photo ? tile.photo : `/client/assets/mock${getRandomInt(1, 6)}.jpg`}
                                         style={{height: '100%', width: '100%'}}/>
                                </GridTile>
                            </a>
                        ))}
                    </GridList>
                </div>
            </div>
        );
    }
});

module.exports = MainPage;
