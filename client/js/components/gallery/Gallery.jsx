'use strict';

import React from 'react';
import Icon from 'react-fa';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import storeMixin from 'mixins/storeMixin';

import './gallery.styl';

export let Gallery = React.createClass({
    mixins: [storeMixin],

    openImage(src) {
        this.store.dispatch({
            type: 'openModal',
            content: <img src={src} alt=""/>,
            className: 'gallery-modal'
        });
    },

    render() {
        return (
            <div className="row">
                {this.props.images.map((tile, index) => (
                    tile.img ?
                    <div
                        key={index}
                        title={tile.title}
                        className="col-33-custom gallery-item"
                        onClick={() => { this.openImage(tile.img); } }
                        actionIcon={<IconButton><Icon name="heart" /></IconButton>}
                    >

                        <img src={tile.img} />
                    </div> : null
                ))}
            </div>
        );
    }
});
