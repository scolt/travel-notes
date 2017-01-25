import React from 'react';
import {Paper} from 'material-ui';

import './404.styl';
import '404-bg.jpg';

const NotFound = React.createClass({
    render() {
        return <div className="not-found-page">
            <Paper zDepth={1} className="not-found-message">
                This page not exist. Try to return on main page and search again.
            </Paper>
            <img src="images/404-bg.jpg" alt=""/>
        </div>;
    }
});

export default NotFound;
