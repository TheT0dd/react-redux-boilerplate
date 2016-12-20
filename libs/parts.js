const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

exports.indexTemplate = function(options) {
	return {
		plugins: [
			new HtmlWebpackPlugin({
				template: require('html-webpack-template'),
				title: options.title,
				appMountId: 'app',
				inject: false,
				meta : {
					description: options.description,
					viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
					robots: 'INDEX, FOLLOW'
				},
				links: [
					options.fonts,
					{
						href: '/assets/favicons/favicon.png',
						rel: 'icon',
						sizes: '128x128',
						type: 'image/png'
					}
				]
			})
		]
	};
};

exports.loadJSX = function(include) {
	return {
		module: {
			loaders: [
				{
					test: /\.(js|jsx)$/,
					// Enable caching for extra performance
					loaders: ['babel?cacheDirectory'],
					include: include
				}
			]
		}
	};
};

exports.loadIsparta = function(include) {
	return {
		module: {
			preLoaders: [
				{
					test: /\.(js|jsx)$/,
					loaders: ['isparta-instrumenter'],
					include: include
				}
			]
		}
	};
};

exports.lintJSX = function(include) {
	return {
		module: {
			preLoaders: [
				{
					test: /\.(js|jsx)$/,
					loaders: ['eslint'],
					include: include
				}
			]
		}
	};
};

exports.enableReactPerformanceTools = function() {
	return {
		module: {
			loaders: [
				{
					test: require.resolve('react'),
					loader: 'expose?React'
				}
			]
		}
	};
};

exports.devServer = function(options) {
	const ret = {
		devServer: {
			// Enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come
			// in handy in more complicated setups.
			historyApiFallback: true,

			// Unlike the cli flag, this doesn't set
			// HotModuleReplacementPlugin!
			hot: true,
			inline: true,

			stats: {
				chunks: false, // Makes the build much quieter
				colors: true
			},

			// Parse host and port from env to allow customization.
			//
			// If you use Vagrant or Cloud9, set
			// host: options.host || '0.0.0.0';
			//
			// 0.0.0.0 is available to all network devices
			// unlike default `localhost`.
			host: options.host, // Defaults to `localhost`
			port: options.port // Defaults to 8080
		},
		plugins: [// Enable multi-pass compilation for enhanced performance
			// in larger projects. Good default.
			new webpack.HotModuleReplacementPlugin({multiStep: true})]
	};

	if (options.poll) {
		ret.watchOptions = {
			// Delay the rebuild after the first change
			aggregateTimeout: 300,
			// Poll using interval (in ms, accepts boolean too)
			poll: 1000
		};
	}

	return ret;
};

// Provides common module exports as variables
exports.provide = function(paramsObj) {
	return {
		plugins: [// So that we may use the following vars without explicitly requiring the modules
			// NOTE: webpack internally will resolve these vars by requiring the modules
			new webpack.ProvidePlugin(paramsObj)]
	};
};

exports.setupCSS = function(globalIncludes, moduleIncludes) {
	return {
		module: {
			loaders: [
				// Loader for tradional, global less files (i.e. bootstrap)
				{
					test: /\.less$/,
					loader: 'style-loader!css-loader!less-loader',
					include: globalIncludes
				},
				// Loader for css-module files (usuallyy exist inside component folders)
				{
					test: /\.less$/,
					loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!less-loader',
					include: moduleIncludes
				}
			]
		}
	};
};

exports.minify = function() {
	return {
		plugins: [new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})]
	};
};

exports.setFreeVariable = function(key, value) {
	const env = {};
	env[key] = JSON.stringify(value);

	return {
		plugins: [new webpack.DefinePlugin(env)]
	};
};

exports.extractBundle = function(options) {
	const entry = {};
	entry[options.name] = options.entries;

	return {
		// Define an entry point needed for splitting.
		entry: entry,
		plugins: [// Extract bundle and manifest files. Manifest is
			// needed for reliable caching.
			new webpack.optimize.CommonsChunkPlugin({
				names: [
					options.name, 'manifest'
				],

				// options.name modules only
				minChunks: Infinity
			})]
	};
};

exports.clean = function(path) {
	return {
		plugins: [new CleanWebpackPlugin([path], {root: process.cwd()})]
	};
};

exports.extractCSS = function(paths) {
	return {
		module: {
			loaders: [// Extract CSS during build
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style', 'css'),
					include: paths
				}
			]
		},
		plugins: [// Output extracted CSS to a file
			new ExtractTextPlugin('[name].[chunkhash].css')]
	};
};

exports.copy = function(paths, context) {
	context = context || '';
	return {
		plugins: [
			new CopyWebpackPlugin(
				paths.map( p => {
					return {
						context: p,
						from: '**/*',
						to: p.replace(context, '')
					};
				})
			)
		]
	};
};

exports.npmInstall = function(options) {
	options = options || {};

	return {
		plugins: [new NpmInstallPlugin(options)]
	};
};
