'use strict';
require('react-tap-event-plugin')();

import React from 'react';
import Router from 'Router';
import {render} from 'react-dom';
import '../styl/global.styl';

window.startApp = () => render(<Router/>, document.getElementById('app'));

/^(http|https):\/\//.test(document.URL) ?
    window.startApp() :
    document.addEventListener('deviceready', window.startApp, false);

