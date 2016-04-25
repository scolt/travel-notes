'use strict';

let React = require('react');
let Menu = require('./components/menu/Menu');
let Footer = require('./components/footer/Footer');

let storeMixin = require('mixins/storeMixin');

import 'flexboxgrid/dist/flexboxgrid.min.css';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
import store from 'store';
import {logoutUser} from 'actions/users';
import Snackbar from 'material-ui/lib/snackbar';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Icon from 'react-fa';
import restApi from 'actions/restApi';

let pingServer = () => (
    restApi({
        model: 'users',
        action: 'ping',
        reducer: 'user'
    })
);

let Layout = React.createClass({
    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        this.setState(store.getState());
        store.dispatch(pingServer());
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
                    <Menu menu={this.state.menu}/>
                </div>
                <div className="col-xs-12">
                    {this.props.children}
                </div>
                <Snackbar
                    open={this.state.snackbar.open || false}
                    message={this.state.snackbar.message || ''}
                    autoHideDuration={2000}
                    onRequestClose={() => {store.dispatch({type: 'snackbarClose'});}}
                />
                <SweetAlert
                    show={this.state.sweetalert.open || false}
                    title={this.state.sweetalert.title || ''}
                    text={this.state.sweetalert.message || ''}
                    type={this.state.sweetalert.type || 'info'}
                    onConfirm={() => {store.dispatch({type: 'alertClose'});}}
                />
                <div className="footer"><Footer/></div>
            </div>
        );
    }
});

module.exports = Layout;
