import React from 'react';
import {Card, CardText} from 'material-ui';

const style = {
    backgroundColor: 'grey'
};

const Footer = React.createClass({
    render() {
        return (
            <Card>
                <CardText style={style}>
                    &copy;2016 TravelNote
                </CardText>
            </Card>
        );
    }
});

export default Footer;
