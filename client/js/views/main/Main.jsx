'use strict';

import React from 'react';
import Icon from 'react-fa';
import {GridList, GridTile, SelectField, MenuItem, Toggle, Card} from 'material-ui';

import restApi from 'actions/restApi';

import storeMixin from 'mixins/storeMixin';
import mock1 from 'mock1.jpg';
import mock2 from 'mock2.jpg';
import mock3 from 'mock3.jpg';
import mock4 from 'mock4.jpg';
import mock5 from 'mock5.jpg';
import mock6 from 'mock6.jpg';
import add from 'add.png';
import './main.styl';

const styles = {
    root: {
        width: '100%'
    },
    gridList: {
        width: '100%',
        margin: '0 auto',
        marginBottom: 24
    },
    checkbox: {
        float: 'right',
        width: '190px',
        paddingRight: '25px',
        margin: '33px 0 '
    },
    card: {
        width: '100%',
        margin: '0 auto'
    }
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateGrid() {
    let columnCount = Math.ceil(window.innerWidth / 300);
    return {
        count: columnCount
    };
}

const MainPage = React.createClass({
    mixins: [storeMixin],

    componentWillMount() {
        this.store.dispatch({type: 'restoreNoteFilterPayload'});
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    authorSelect(e, value) {
        let filters = value ? {'userId': this.state.users.user.username} : {};
        this.store.dispatch({type: 'prepareNoteFilterPayload',
                            currentUserID: this.state.users.user.username,
                            filters: filters,
                            updated: 'filters'});

        this.request = this.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    deleteSelect(e, id) {
        e.preventDefault();
        this.store.dispatch(restApi({
            type: 'deleteOneNote',
            model: 'notes',
            action: 'delete',
            id: id
        }));
    },

    orderByChange(e, index, value) {
        this.store.dispatch({type: 'prepareNoteFilterPayload',
            currentUserID: this.state.users.user.username,
            updated: 'order',
            orderBy: value});

        this.request = this.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    addItem() {
        if (this.state.users.user.username) {
            location.href = '#/add';
        } else {
            this.store.dispatch({type: 'loginForAdd'});
        }
    },

    render() {
        let author = null;
        const username = this.state.users.user.username;
        const columnsConfig = calculateGrid(this.state.notes.notes.length);
        let notes = this.state.notes.notes.map((item, index) => {
            if (columnsConfig.count % 2 === 0 &&
                index >= columnsConfig.count - 1 &&
                index < (columnsConfig.count + columnsConfig.count/2 - 1)) {
                item.col = 2;
            } else {
                item.col = 1;
            }

            return item;
        });

        if (username) {
            author = <Toggle
                label="Only My Notes"
                labelPosition="left"
                style={styles.checkbox}
                onToggle={this.authorSelect}
                toggled={!!this.state.notes.filters.onlyMy}
            />;
        }

        const items = [
            <MenuItem key={1} value={'title'} primaryText="Title" />,
            <MenuItem key={2} value={'username'} primaryText="User" />,
            <MenuItem key={3} value={'_id'} primaryText="Date" />
        ];

        let spinner = <div className="spinner"><Icon name="circle-o-notch" spin/></div>;

        let filters = <div style={styles.card}>
            {author}
            <SelectField
                value={this.state.notes.filters.orderBy.name}
                onChange={this.orderByChange}
                floatingLabelText="Order By"
                className="filter-item"
            >
                {items}
            </SelectField>
        </div>;

        let content = <div className="row">
            <div style={styles.root}>
                <GridList
                    cols={columnsConfig.count}
                    cellHeight={200}
                    padding={1}
                    style={styles.gridList}
                >
                    <GridTile cols={1}
                         rows={1} className="feed-item-add" onClick={this.addItem}>
                        <div className="feed-item-in">
                            <Icon name="plus"/>
                        </div>
                    </GridTile>
                    {notes.map((tile, index) => (
                        <a href={`#/note/${tile._id}`} key={tile._id}
                           cols={tile.col}
                           rows={tile.col}
                           className="flat-block-item">
                            <GridTile
                                title={tile.title}
                                subtitle={<span>by <b>{tile.userId}</b></span>}
                                actionPosition="left"
                                titlePosition="bottom"
                                className="feed-item"
                            >
                                {tile.userId === username ? <i className="fa fa-trash" onClick={(e) => this.deleteSelect(e, tile._id)}></i> : null}
                                <img src={tile.photo || `client/assets/mock${getRandomInt(1, 6)}.jpg`}
                                     style={{height: '100%', width: '100%'}} />
                            </GridTile>
                        </a>
                    ))}
                </GridList>
            </div>
        </div>;

        return (
            <div>
                {filters}
                {this.state.net.isProcessing ? spinner : content}
            </div>
        );
    }
});

module.exports = MainPage;
