'use strict';
require('react-tap-event-plugin')();

import React from 'react';
import Router from 'Router';
import {render} from 'react-dom';
import '../styl/global.styl';

(function () {
    let url = document.URL;
    const isSmart = (url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
    if(isSmart){
        document.addEventListener('deviceready', startApp, false);
    } else {
        startApp();
    }

    function startApp() {
        render(<Router/>, document.getElementById('app'));
    }
})();
