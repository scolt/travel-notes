'use strict';

let React = require('react');
let {Router: ReactRouter, Route, hashHistory} = require('react-router');

let Layout = require('components/layout/Layout');
let Main = require('views/main/Main');
let Note = require('views/note/Note');
let Gallery = require('views/gallery/Gallery');
let About = require('views/about/About');
let Map = require('views/map/Map');
let LandingPage = require('views/landingPage/LandingPage');
let NotFound = require('views/notFound/NotFound');

let Router = React.createClass({
    render() {
        return (
            <ReactRouter history={hashHistory}>
                <Route component={Layout}>
                    <Route path="/main" component={Main}/>
                    <Route path="/note" component={Note}/>
                    <Route path="/gallery" component={Gallery}/>
                    <Route path="/about" component={About}/>
                    <Route path="/map" component={Map}/>
                </Route>
				<Route path="/landingPage" component={LandingPage}/>
                <Route path="*" component={NotFound}/>
            </ReactRouter>
        );
    }
});

module.exports = Router;
