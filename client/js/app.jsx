'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Component = require('components/' + location.hash.slice(1) + '.jsx');

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);
