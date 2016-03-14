'use strict';

let React = require('react');
let {Router: ReactRouter, Route, Redirect, useRouterHistory} = require('react-router');

let Layout = require('components/layout/Layout');
let Main = require('views/main/Main');
let Note = require('views/note/Note');
let Gallery = require('views/gallery/Gallery');
let About = require('views/about/About');
let Map = require('views/map/Map');
let LandingPage = require('views/landingPage/LandingPage');
let NotFound = require('views/notFound/NotFound');

let Example = require('views/example/Example');

import { createHashHistory } from 'history';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

let Router = React.createClass({
    render() {
        return (
            <ReactRouter history={appHistory}>
                <Route component={Layout}>
                    <Route path="/landingPage" component={LandingPage}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/note" component={Note}/>
                    <Route path="/gallery" component={Gallery}/>
                    <Route path="/about" component={About}/>
                    <Route path="/map" component={Map}/>
                    <Route path="/404" component={NotFound}/>
                </Route>
                <Route path="/example" component={Example}/>
                <Redirect from="/" to="/main"/>
                <Redirect from="*" to="/404"/>
            </ReactRouter>
        );
    }
});

module.exports = Router;
