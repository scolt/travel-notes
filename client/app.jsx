import 'common/styl/global.styl';

import React from 'react';
import AppContainer from 'appContainer';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

window.startApp = () => render(<AppContainer/>, document.getElementById('app'));
/^(http|https):\/\//.test(document.URL) ?
    window.startApp() :
    document.addEventListener('deviceready', window.startApp, false);
