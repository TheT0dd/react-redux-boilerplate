import express from 'express';
import path from 'path';
import compression from 'compression';
import favicon from 'serve-favicon';
import chalk from 'chalk';
import qs from 'qs';

// Server rendering imports
// ==========================================================
//

// we'll render React components
import React from 'react';
// we'll use this to render our app to an html string
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router';
// we'll wrap the app into a redux store provider
import { Provider } from 'react-redux';
// we'll create a new store instance for each request
import { createStore } from 'redux';
import rootReducer from './src/reducers';
// we'll match each request url agains these routes
import Routes from './src/components/Routes/Routes';
import App from './src/App';
import Html from './src/Html';

//
// ==========================================================
//


var app = express();

// must be first!
app.use(compression());
// server favicon
app.use(favicon(path.join(__dirname, 'build/assets/favicons/favicon.png')));
// match react-router route & pre-render html
app.use(matchClientRoute);
// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'build')));


// matches req.url to a react-router route and, if a match is found,
// pre-renders html, delegating to handleRender()
function matchClientRoute(req, res, next) {
	// match the routes to the url
	match({ routes: Routes, location: req.url }, (err, redirect, props) => {
		// in here we can make some decisions all at once
		if (err) {
			// there was an error somewhere during route matching
			res.status(500).send(err.message);
		} else if (redirect) {
			// we haven't talked about `onEnter` hooks on routes, but before a
			// route is entered, it can redirect. Here we handle on the server.
			res.redirect(redirect.pathname + redirect.search);
		} else if (props) {
			// if we got props then we matched a route and can render
			// NOTE: `RouterContext` is what the `Router` renders. `Router` keeps these
			// `props` in its state as it listens to `browserHistory`. But on the
			// server our app is stateless, so we need to use `match` to
			// get these props before rendering.
			console.log(
				chalk.white.dim('Pre-rendering html... Matched route: ') +
				chalk.white.dim(req.url)
			);
			handleRender(req, res, props);
		} else {
			// no errors, no redirect, we just didn't match anything
			next();
		}
	});
}

// Pre-renders the app as an html string, optionally passing an initial state
function handleRender(req, res, props) {

	// Read request parameters so we may compute an initial state
	const params = qs.parse(req.query);

	// An initial state could be compiled here & passed to createStore()
	// NOTE: we could async fetch data in order to compile our state (i.e.
	// call to an external api or local database):
	// http://redux.js.org/docs/recipes/ServerRendering.html#async-state-fetching
	// ...

	// Create a new Redux store instance
	const store = createStore(rootReducer);

	const css = new Set();
	// Global (context) variables that can be easily accessed from any React component
	// https://facebook.github.io/react/docs/context.html
	const context = {
		// Enables critical path CSS rendering
		// https://github.com/kriasoft/isomorphic-style-loader
		insertCss: (...styles) => {
			// eslint-disable-next-line no-underscore-dangle
			styles.forEach(style => css.add(style._getCss()));
		},
		// Pass the redux store
		store
	};

	// Render our main app component, much like we do in index.jsx,
	// instead of <Router> however we render <RouterContext>
	const innerHtml = renderToString(
		<App context={context}>
			<RouterContext {...props} />
		</App>
	);

	// Grab the initial state from our Redux store
	const finalState = store.getState();

	const html = renderToStaticMarkup(<Html html={innerHtml} state={finalState} />);

	// Send the rendered page back to the client
	res.send(`<!doctype html>${html}`);
}

var PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log('Production Express server running at localhost:' + PORT);
});
