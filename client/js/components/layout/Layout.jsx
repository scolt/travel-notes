'use strict';

let React = require('react');
let Menu = require('./components/menu/Menu');
let Footer = require('./components/footer/Footer');

let storeMixin = require('mixins/storeMixin');

import 'flexboxgrid/dist/flexboxgrid.min.css';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

let store = require('store');
import {pingUser, logoutUser} from 'actions/users';
import Snackbar from 'material-ui/lib/snackbar';

let Layout = React.createClass({
    getInitialState() {
        return {};
    },

    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        this.setState(store.getState());
        store.dispatch(pingUser());
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    handleStoreChange() {
        let state = this.store.getState();
        this.setState(state);
    },

    render() {
        return (
            <div>
                <div className="header">
                    <Menu count={this.state.counter} menu={this.state.menu}/>
                </div>
                <div className="col-xs-12">
                    {this.props.children}
                </div>
                <Snackbar
                    open={this.state.login.success}
                    message="You are successful logged in."
                    autoHideDuration={2000}
                    onRequestClose={() => {this.state.login.success = false; this.setState(this.state); location.hash = '#';}}
                />
                <div className="footer"><Footer/></div>
            </div>
        );
    }
});

module.exports = Layout;
