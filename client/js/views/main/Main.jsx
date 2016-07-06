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

const styles = {
    root: {
        width: '100%'
    },
    gridList: {
        width: '90%',
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
        width: '90%',
        margin: '25px auto',
        padding: '10px 30px'
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
            location.href = '/#/add';
        } else {
            this.store.dispatch({type: 'loginForAdd'});
        }
    },

    render() {
        let author = null;
        const columnsConfig = calculateGrid(this.state.notes.notes.length);

        if (this.state.users.user.username) {
            author = <Toggle
                label="Only My Notes"
                labelPosition="left"
                style={styles.checkbox}
                onToggle={this.authorSelect}
                toggled={this.state.notes.filters.onlyMy}
            />;
        }

        const items = [
            <MenuItem key={1} value={'title'} primaryText="Title" />,
            <MenuItem key={2} value={'username'} primaryText="User" />,
            <MenuItem key={3} value={'_id'} primaryText="Date" />
        ];

        let spinner = <div className="spinner"><Icon name="circle-o-notch" spin/></div>;

        let filters = <Card style={styles.card}>
            {author}
            <SelectField
                value={this.state.notes.filters.orderBy}
                onChange={this.orderByChange}
                floatingLabelText="Order By"
                className="filter-item"
            >
                {items}
            </SelectField>
        </Card>;

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
                    {this.state.notes.notes.map((tile) => (
                        <a href={`#/note/${tile._id}`} key={tile._id}
                           cols={1}
                           rows={1}>
                            <GridTile
                                title={tile.title}
                                subtitle={<span>by <b>{tile.userId}</b></span>}
                                actionPosition="left"
                                titlePosition="bottom"
                                className="feed-item"
                            >
                                <img src={tile.photo ? tile.photo : `/client/assets/mock${getRandomInt(1, 6)}.jpg`}
                                     style={{height: '100%', width: '100%'}}/>
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
