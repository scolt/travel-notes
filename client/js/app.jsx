'use strict';

require('react-tap-event-plugin')();

let React = require('react');
let {render} = require('react-dom');
let Router = require('Router');

render(<Router/>, document.getElementById('app'));
