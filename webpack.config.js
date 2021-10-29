const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
	},
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@containers': path.resolve(__dirname, 'src/containers'),
			'@global': path.resolve(__dirname, 'src/global'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@customTypes': path.resolve(__dirname, 'src/types'),
			'@services': path.resolve(__dirname, 'src/services'),
		},
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts|jsx|js)?$/,
				// use: 'ts-loader',
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-typescript', '@babel/preset-react']
					},
				}
			},
			{
				test: /\.(s[ac]ss)$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.css$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,	
						},
					},
				]
			},
		]
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebPackPlugin({
		  template: './src/index.html',
		}),
	]
};