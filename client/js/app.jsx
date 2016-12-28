import '../styl/global.styl';

import React from 'react';
import Router from 'Router';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

window.startApp = () => render(<Router/>, document.getElementById('app'));

/^(http|https):\/\//.test(document.URL) ?
    window.startApp() :
    document.addEventListener('deviceready', window.startApp, false);
