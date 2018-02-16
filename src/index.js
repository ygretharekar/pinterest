import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Component from './routes/routes';
import configureStore from './store/store';

// import registerServiceWorker from './registerServiceWorker';

import {unregister} from './registerServiceWorker';

// ...


let store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Component />
	</Provider>, 
	document.getElementById('root')
);

unregister();
// registerServiceWorker();
