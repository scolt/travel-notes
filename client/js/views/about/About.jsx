'use strict';

let React = require('react');
let storeMixin = require('mixins/storeMixin');

let About = React.createClass({
    mixins: [
        storeMixin
    ],

    componentDidMount() {
        this.store.dispatch({type: 'dec'});
    },

    render() {
        return <div>About</div>;
    }
});

module.exports = About;
