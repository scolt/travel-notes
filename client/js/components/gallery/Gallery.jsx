import './gallery.styl';

import React from 'react';
import Icon from 'react-fa';
import {GridList, GridTile, IconButton} from 'material-ui';
import storeMixin from 'mixins/storeMixin';

export const Gallery = React.createClass({
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
                        onClick={() => { this.openImage(tile.img); } }>

                        <img src={tile.img} />
                    </div> : null
                ))}
                {this.props.appendAfter}
            </div>
        );
    }
});
