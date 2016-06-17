'use strict';

import 'flexboxgrid/dist/flexboxgrid.min.css';
import 'sweetalert/dist/sweetalert.css';

import React from 'react';
import Icon from 'react-fa';
import SweetAlert from 'sweetalert-react';
import {AppBar, RaisedButton, Snackbar} from 'material-ui';

import Menu from './components/menu/Menu';
import Footer from './components/footer/Footer';

import storeMixin from 'mixins/storeMixin';

import restApi from 'actions/restApi';

let Layout = React.createClass({
    mixins: [storeMixin],

    afterComponentWillMount() {
        this.request = this.store.dispatch(restApi({
            model: 'users',
            action: 'ping',
            reducer: 'user'
        }));
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
                    onRequestClose={() => {this.store.dispatch({type: 'snackbarClose'});}}
                />
                <SweetAlert
                    show={this.state.sweetalert.open || false}
                    title={this.state.sweetalert.title || ''}
                    text={this.state.sweetalert.message || ''}
                    type={this.state.sweetalert.type || 'info'}
                    onConfirm={() => {this.store.dispatch({type: 'alertClose'});}}
                />
                <div className="footer"><Footer/></div>
            </div>
        );
    }
});

module.exports = Layout;
