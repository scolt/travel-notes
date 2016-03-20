'use strict';

import React from 'react';
import {Gallery} from 'components/gallery/Gallery';


let GalleryPage = React.createClass({
    render() {
        var tilesData = [
            {
                img: 'http://lorempixel.com/300/200/nature/1',
                title: 'Breakfast',
                author: 'jill111'
            },
            {
                img: 'http://lorempixel.com/300/200/nature/2',
                title: 'Tasty burger',
                author: 'pashminu'
            },
            {
                img: 'http://lorempixel.com/300/200/nature/3',
                title: 'Camera',
                author: 'Danson67'
            },
            {
                img: 'http://lorempixel.com/300/200/nature/4',
                title: 'Morning',
                author: 'fancycrave1'
            },
            {
                img: 'http://lorempixel.com/300/200/nature/5',
                title: 'Hats',
                author: 'Hans'
            },
            {
                img: 'http://lorempixel.com/300/200/nature/6',
                title: 'Honey',
                author: 'fancycravel'
            },
            {
                img: 'http://lorempixel.com/300/200/nature/7',
                title: 'Vegetables',
                author: 'jill111'
            },
            {
                img: 'http://lorempixel.com/300/200/nature/8',
                title: 'Water plant',
                author: 'BkrmadtyaKarki'
            }
        ];
        return <div><Gallery images={tilesData}/></div>;
    }
});

module.exports = GalleryPage;
