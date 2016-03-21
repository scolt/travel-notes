'use strict';

let isGoogleapisLoaded = false;
let $script = require('scriptjs');

let React = require('react');
let Map = require('components/map/Map');

let MapPage = React.createClass({
    componentWillMount() {
        if (!isGoogleapisLoaded) {
            $script('//maps.googleapis.com/maps/api/js', () => {
                isGoogleapisLoaded = true;
                this.forceUpdate();
            });
        }
    },

    render() {
        if (!isGoogleapisLoaded) return null;
        function marker() {
            this.marker = {
                position: {
                    lat: 25,
                    lng: 121
                },
                title: 'Venezia',
                window: {
                    title: 'Venezia',
                    subtitle: 'Италия',
                    descr: 'Город в Италии, административный центр области Венеция и провинции Венеция. Образует коммуну, разделённую на 6 самоуправляемых районов.',
                    link: '#/note/italy_venezia_999'

                },
                defaultAnimation: 2
            };
        }
        var markers = [];


        for (let i = 0; i < 100; i++) {

            var m = new marker().marker;
            m.position = {
                lat: 25 + i * Math.random() + Math.random(),
                lng: 121 + i * Math.random()
            };

            markers.push(m);
        }

        return <div className="row"><Map markers={markers}/></div>;
    }
});

module.exports = MapPage;
