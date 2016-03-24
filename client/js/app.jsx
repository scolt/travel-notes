'use strict';

let request = require('superagent');
require('react-tap-event-plugin')();

import React from 'react';
import Router from 'Router';
import {render} from 'react-dom';
import '../styl/global.styl';

render(<Router/>, document.getElementById('app'));
