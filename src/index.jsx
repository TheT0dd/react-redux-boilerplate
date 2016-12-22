import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import App from './App';
import Routes from './components/Routes/index';
import configureStore from './configureStore';

const context = {
	// Enables critical path CSS rendering
	// https://github.com/kriasoft/isomorphic-style-loader
	insertCss: (...styles) => {
		// eslint-disable-next-line no-underscore-dangle
		const removeCss = styles.map(x => x._insertCss());
		return () => {
			removeCss.forEach(f => f());
		};
	},
	// Initialize a new Redux store
	store: configureStore()
};

render(
	<App context={context}>
		<Router routes={Routes} history={browserHistory} />
	</App>,
	document.getElementById('app')
);
