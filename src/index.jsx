import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
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

// Provider component takes the store as a prop
// and stores it in context, making it available
// to any components that wish to connect to it
// (see connect() from 'react-redux')
render(
	<App context={context} />,
	document.getElementById('app')
);
