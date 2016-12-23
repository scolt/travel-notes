'use strict';

import React from 'react';
import {Gallery} from 'components/gallery/Gallery';
import restApi from 'actions/restApi';
import storeMixin from 'mixins/storeMixin';

function calculateGrid() {
    let columnCount = Math.ceil(window.innerWidth / 300);
    return {
        count: columnCount
    };
}

let GalleryPage = React.createClass({
    mixins: [storeMixin],

    componentWillMount() {
        this.request = this.store.dispatch(restApi({
            model: 'notes',
            type: 'getNotes'
        }));
    },

    render() {
        let tilesData = this.state.notes.notes.map((item, index) => {
            item.img = item.photo;
            return item;
        });

        return <div><Gallery images={tilesData}/></div>;
    }
});

module.exports = GalleryPage;
