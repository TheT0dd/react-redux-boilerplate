import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import App from './App';
import Routes from './components/Routes/index';
import { configureStore } from './helpers/redux';
import { insertCss } from './helpers/isl';

const context = {
	insertCss,
	// Initialize a new Redux store
	store: configureStore()
};

render(
	<App context={context}>
		<Router routes={Routes} history={browserHistory} />
	</App>,
	document.getElementById('app')
);
