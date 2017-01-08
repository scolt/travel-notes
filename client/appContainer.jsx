import React from 'react';
import {Router as ReactRouter, Route, Redirect, useRouterHistory} from 'react-router';
import {view as NoteView, list as NoteList, form as NoteForm} from 'containers/Note/index';
import {login as loginView} from 'containers/User/index';
import Layout from 'common/components/layout/ContainerLayout';
import {createHashHistory} from 'history';


import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const muiTheme = getMuiTheme(baseTheme);

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

const views = {
    '/login': loginView,
    '/main': NoteList,
    '/note/create': NoteForm,
    '/note/:id': NoteView
};

let AppContainer = React.createClass({
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
