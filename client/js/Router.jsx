import React from 'react';
import {Router as ReactRouter, Route, Redirect, useRouterHistory} from 'react-router';

import Layout from 'components/layout/Layout';
import Main from 'views/main/Main';
import Note from 'views/note/Note';
import AddNote from 'views/note/add/Add';
import Gallery from 'views/gallery/Gallery';
import Map from 'views/map/Map';
import LandingPage from 'views/landingPage/LandingPage';
import NotFound from 'views/notFound/NotFound';
import Register from 'views/register/Register';
import Login from 'views/login/Login';
import Profile from 'views/profile/Profile';

import { createHashHistory } from 'history';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const Router = React.createClass({
    render() {
        return (
            <ReactRouter history={appHistory}>
                <Route component={Layout}>
                    <Route path="/landingPage" component={LandingPage}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/note(/:id)" component={Note}/>
                    <Route path="/gallery" component={Gallery}/>
                    <Route path="/map" component={Map}/>
                    <Route path="/404" component={NotFound}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile(/:username)" component={Profile}/>
                    <Route path="/add" component={AddNote}/>
                </Route>
                <Redirect from="/" to="/main"/>
                <Redirect from="*" to="/404"/>
            </ReactRouter>
        );
    }
});

export default Router;
