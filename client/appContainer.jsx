import React from 'react';
import {Router as ReactRouter, Route, Redirect, useRouterHistory} from 'react-router';

import {
    view as NoteView,
    list as NoteList,
    form as NoteForm,
    map as Map,
    gallery as Gallery
} from './containers/Note/index';
import {
    login as LoginView,
    register as Register,
    profile as Profile
} from './containers/User/index';
import NotFound from './containers/404/Container404';
import LandingPage from './containers/LandingPage/ContainerLandingPage';

import Layout from './common/components/layout/ContainerLayout';
import {createHashHistory} from 'history';


import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const muiTheme = getMuiTheme(baseTheme);

const appHistory = useRouterHistory(createHashHistory)();

const views = {
    '/': LandingPage,
    '/404': NotFound,
    '/login': LoginView,
    '/register': Register,
    '/profile/:id': Profile,
    '/main': NoteList,
    '/map': Map,
    '/gallery': Gallery,
    '/note/create': NoteForm,
    '/note/:id': NoteView
};

const AppContainer = React.createClass({
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <ReactRouter history={appHistory}>

                    <Route component={Layout}>
                        {Object.keys(views).map(key => <Route key={key} path={key} component={views[key]}/>)}
                    </Route>
                    <Redirect from="/" to="/main"/>
                    <Redirect from="*" to="/404"/>
                </ReactRouter>
            </MuiThemeProvider>
        );
    }
});

export default AppContainer;
