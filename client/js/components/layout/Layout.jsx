'use strict';

let React = require('react');
let Menu = require('./components/menu/Menu');
let Footer = require('./components/footer/Footer');

import 'flexboxgrid/dist/flexboxgrid.min.css';

let store = require('store');

let Layout = React.createClass({
    getInitialState() {
        return {};
    },

    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        this.setState(store.getState());
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    handleStoreChange() {
        let state = this.store.getState();
        this.setState(state);
    },

    render() {
        if (!this.state.menu) return null;
        return (
            <div>
                <div className="header"><Menu count={this.state.counter} menu={this.state.menu}/></div>
                <div className="col-xs-12">
                    {this.props.children}
                </div>
                <div className="footer"><Footer/></div>
            </div>
        );
    }
});

module.exports = Layout;
