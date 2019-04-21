const path = require('path');
const webpack = require("webpack");

module.exports = {
	entry: './frontend/index.js',
	watch: true,
	target: 'node',
	mode: "development",
	module: {
		rules: [
			{
			  test: /\.css$/,
			  use: ['style-loader', 'css-loader']
			}
		],
	},
	watchOptions: {
		poll: true
	},
	plugins: [
		new webpack.ExternalsPlugin('commonjs', [
			 'electron'
		])
	],
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'templates')
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	}
};
