import React from 'react';
import {Link} from 'react-router';
import {Card, CardTitle, CardText} from 'material-ui';

const NotFound = React.createClass({
    render() {
        return (
            <Card>
                <CardTitle title="404 error" subtitle="page not found" />
                <CardText>We are sorry but the page you are looking for does not exist<br />
                    You could return to the <Link to="#/main">homepage</Link>
                </CardText>
            </Card>
        );
    }
});

export default NotFound;
