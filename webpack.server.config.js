const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');

const parts = require('./libs/parts');

const PATHS = {
	app: path.join(__dirname, 'src'),
	style: path.join(__dirname, '/assets/css', 'style.less')
};

module.exports = merge(
	{
		entry: path.resolve(__dirname, 'server.js'),

		output: {
			filename: 'server.bundle.js'
		},

		target: 'node',

		// keep node_module paths out of the bundle
		externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).
			concat([
				'react-dom/server', 'react/addons'
			]).reduce(function(ext, mod) {
				ext[mod] = 'commonjs ' + mod;
				return ext;
			}, {}),

		resolve: {
			extensions: ['', '.js', '.jsx']
		},

		node: {
			__filename: true,
			__dirname: true
		},

		module: {
			loaders: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader?presets[]=es2015&presets[]=react'
				},
				{
					test: /\.less$/,
					loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!less-loader',
					include: PATHS.app
				}
			]
		}
	}
);
