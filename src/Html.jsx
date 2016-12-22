import React, { Component, PropTypes } from 'react';
import serialize from 'serialize-javascript';


class Html extends Component {
	render() {
		const { html, state } = this.props;

		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<meta content="ie=edge" httpEquiv="x-ua-compatible" />
					<meta content="A starting point for new React & Redux based apps" name="description" />
					<meta content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" name="viewport" />
					<meta content="INDEX, FOLLOW" name="robots" />
					<title>React Redux Boiler</title>
					<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,600,700" rel="stylesheet" />
					<link href="/assets/favicons/favicon.png" rel="icon" sizes="128x128" type="image/png" />
				</head>
				<body>
					<div id="app">{html}</div>
					{state && (
						<script
							dangerouslySetInnerHTML={{
								__html: `window.APP_STATE=${serialize(state, {isJSON: true})}`
							}}
						/>
					)}
					<script src="manifest.js" type="text/javascript"></script>
					<script src="vendor.js" type="text/javascript"></script>
					<script src="style.js" type="text/javascript"></script>
					<script src="app.js" type="text/javascript"></script>
				</body>
			</html>
		);
	}

}

export default Html;
