'use strict';

let React = require('react');
let Menu = require('./components/menu/Menu');
let Footer = require('./components/footer/Footer');

let storeMixin = require('mixins/storeMixin');

import 'flexboxgrid/dist/flexboxgrid.min.css';
import RaisedButton from 'material-ui/lib/raised-button';

let store = require('store');
import {pingUser, logoutUser} from 'actions/users';

let Layout = React.createClass({
    mixins: [
        storeMixin
    ],

    me() {
        store.dispatch(pingUser(this.state));
    },

    logout() {
        store.dispatch(logoutUser(this.state));
    },

    render() {
        return (
            <div>
                <div className="header">
                    <Menu count={this.state.counter} menu={this.state.menu}/>
                    <RaisedButton
                        label="Check User status"
                        primary={true}
                        onTouchTap={this.me}
                    />
                    <RaisedButton
                        label="Logout"
                        primary={true}
                        onTouchTap={this.logout}
                    />
                </div>
                <div className="col-xs-12">
                    {this.props.children}
                </div>
                <div className="footer"><Footer/></div>
            </div>
        );
    }
});

module.exports = Layout;
