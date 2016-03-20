'use strict';

import React from 'react';
import Icon from 'react-fa';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';

export let Gallery = React.createClass({
    render() {
        return (
            <div>
                <GridList cellHeight={200}>
                    {this.props.images.map(tile => (
                        <GridTile
                            key={tile.img}
                            title={tile.title}
                            subtitle={<span>by <b>{tile.author}</b></span>}
                            actionIcon={<IconButton><Icon name="heart" /></IconButton>}
                        >
                            <img src={tile.img} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
    }
});
