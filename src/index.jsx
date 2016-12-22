import 'babel-polyfill';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import InsertCss from './InsertCss';
import Routes from './components/Routes/index';
import configureStore from './configureStore';

const store = configureStore();

// Provider component takes the store as a prop
// and stores it in context, making it available
// to any components that wish to connect to it
// (see connect() from 'react-redux')
render(
	<InsertCss>
		<Provider store={store}>
			<Router routes={Routes} history={browserHistory} />
		</Provider>
	</InsertCss>,
	document.getElementById('app')
);
