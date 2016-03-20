'use strict';

let React = require('react');
let {Router: ReactRouter, Route, Redirect, useRouterHistory} = require('react-router');
<<<<<<< HEAD
=======
let {createHashHistory} = require('history');
>>>>>>> Deleted ?k-* from URL  #17 fixes

let Layout = require('components/layout/Layout');
let Main = require('views/main/Main');
let Note = require('views/note/Note');
let Gallery = require('views/gallery/Gallery');
let About = require('views/about/About');
let Map = require('views/map/Map');
let LandingPage = require('views/landingPage/LandingPage');
let NotFound = require('views/notFound/NotFound');

let Table = require('views/table/Table');
let Example = require('views/example/Example');

<<<<<<< HEAD
import { createHashHistory } from 'history';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

<<<<<<< HEAD
=======
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
>>>>>>> Deleted ?k-* from URL  #17 fixes
=======
>>>>>>> Merge remote-tracking branch 'remotes/origin/trunk' into fe/#17_create_about_page
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
                <Route path="/table" component={Table}/>
                <Route path="/example" component={Example}/>
                <Redirect from="/" to="/main"/>
                <Redirect from="*" to="/404"/>
            </ReactRouter>
        );
    }
});

module.exports = Router;
