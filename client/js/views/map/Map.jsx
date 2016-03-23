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
                title: 'Athens',
                window: {
                    title: 'Athens',
                    subtitle: 'The cradle of the European civilization',
                    descr: 'Athens is the capital and largest city of Greece. Athens dominates the Attica region and is one of the worlds oldest cities, with its recorded history spanning around 3,400 years, and the earliest human presence started somewhere between the 11th and 7th millennium BC.',
                    link: '#/note/italy_venezia_999'

                },
                defaultAnimation: 2
            };
        }
        var markers = [];


        for (let i = 0; i < 10; i++) {

            var m = new marker().marker;
            m.position = {
                lat: 37.9908164 + i * Math.random() + Math.random(),
                lng: 23.6682993 + i * Math.random()
            };

            markers.push(m);
        }

        return <div className="row"><Map markers={markers} center={markers[0].position}/></div>;
    }
});

module.exports = MapPage;
