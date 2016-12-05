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
import { renderToString } from 'react-dom/server';
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router';
// we'll wrap the app into a redux store provider
import { Provider } from 'react-redux';
// we'll create a new store instance for each request
import { createStore } from 'redux';
import rootReducer from './src/reducers';
// we'll match each request url agains these routes
import Routes from './src/components/Routes/Routes';

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

	// Render our main app component, much like we do in index.jsx,
	// instead of <Router> however we render <RouterContext>
	const html = renderToString(
		<Provider store={store}>
			<RouterContext {...props}/>
		</Provider>
	);

	// Grab the initial state from our Redux store
	const finalState = store.getState();

	// Send the rendered page back to the client
	res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, preloadedState) {
	return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta content="ie=edge" http-equiv="x-ua-compatible">
        <meta content="A starting point for new React & Redux based apps" name="description">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" name="viewport">
        <meta content="INDEX, FOLLOW" name="robots">
        <title>React Redux Boiler</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,600,700" rel="stylesheet">
        <link href="/assets/favicons/favicon.png" rel="icon" sizes="128x128" type="image/png">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="manifest.js" type="text/javascript"></script>
        <script src="vendor.js" type="text/javascript"></script>
        <script src="style.js" type="text/javascript"></script>
        <script src="app.js" type="text/javascript"></script>
      </body>
  </html>`;
}

var PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log('Production Express server running at localhost:' + PORT);
});
