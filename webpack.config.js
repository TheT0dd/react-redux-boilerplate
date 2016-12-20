const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/parts');

const TARGET = process.env.npm_lifecycle_event;
const ENABLE_POLLING = process.env.ENABLE_POLLING;
const PATHS = {
	app: path.join(__dirname, 'src'),
	style: path.join(__dirname, '/assets/css', 'style.less'),
	build: path.join(__dirname, 'build'),
	test: path.join(__dirname, 'tests'),
	favicons: path.join(__dirname, '/assets/favicons'),
	fonts: path.join(__dirname, '/assets/fonts'),
	img: path.join(__dirname, '/assets/img')
};

process.env.BABEL_ENV = TARGET;

const common = merge(
	{
		// Entry accepts a path or an object of entries.
		// We'll be using the latter form given it's
		// convenient with more complex configurations.
		entry: {
			app: PATHS.app
		},
		output: {
			path: PATHS.build,
			filename: '[name].js'
			// TODO: Set publicPath to match your GitHub project name
			// E.g., '/kanban-demo/'. Webpack will alter asset paths
			// based on this. You can even use an absolute path here
			// or even point to a CDN.
			//publicPath: ''
		},
		resolve: {
			extensions: ['', '.js', '.jsx'],
			root: [ __dirname, PATHS.app ]
		}
	},
	parts.provide({
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery'
	}),
	parts.indexTemplate({
		title: 'React Redux Boiler',
		description: 'A starting point for new React & Redux based apps',
		fonts: 'https://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,600,700'
	}),
	parts.loadJSX(PATHS.app),
	parts.lintJSX(PATHS.app)
);

var config;

// Detect how npm is run and branch based on that
switch (TARGET) {
	case 'stats':
	case 'build':
	case 'build:client':
		config = merge(common,
			{
				devtool: 'source-map',
				entry: {
					style: PATHS.style
				},
				output: {
					path: PATHS.build,
					filename: '[name].js',
					chunkFilename: '[chunkhash].js'
				}
			},
			parts.clean(PATHS.build),
			parts.copy([
				PATHS.img,
				PATHS.fonts,
				PATHS.favicons
			], path.join(__dirname, '/')),
			parts.setFreeVariable('process.env.NODE_ENV', 'production'),
			parts.extractBundle({
				name: 'vendor',
				entries: ['react', 'react-dom']
			}),
			parts.setupCSS(PATHS.style, PATHS.app),
			parts.minify(),
			parts.extractCSS(PATHS.style)
		);
		break;
	case 'test':
	case 'test:tdd':
		config = merge(common,
			{
				devtool: 'inline-source-map'
			},
			parts.loadIsparta(PATHS.app),
			parts.loadJSX(PATHS.test)
		);
		break;
	default:
		config = merge(common,
			{
				devtool: 'eval-source-map',
				entry: {
					style: PATHS.style
				}
			},
			parts.setupCSS(PATHS.style, PATHS.app),
			parts.devServer({
				// Customize host/port here if needed
				host: process.env.HOST,
				port: process.env.PORT || 4000,
				poll: ENABLE_POLLING
			}),
			parts.enableReactPerformanceTools(),
			parts.npmInstall()
		);
}

module.exports = validate(config, {quiet: true});
