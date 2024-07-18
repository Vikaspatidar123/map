// const config = require('./src/config');

module.exports = {
	mode   : 'development',
	module : {
		rules: [
			{
				test    : /\.(js|ts|tsx)$/,
				exclude : [/node_modules/],
				use     : 'swc-loader',
			},
			{
				test    : /\.module\.css$/i,
				exclude : [/node_modules/],
				use     : [
					'style-loader',
					{
						loader  : 'css-loader',
						options : {
							modules       : { localIdentName: '[folder]-[local]-[hash:base64:5]' },
							importLoaders : 1,
						},
					},
					'postcss-loader',
				],
			},
			{
				test    : /\.global\.css$/i,
				exclude : [/node_modules/],
				use     : [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader',
				],
			},
			{
				test    : /\.css$/i,
				exclude : [/node_modules/, /\.module\.css$/, /\.global\.css$/],
				use     : [
					{ loader: 'style-loader', options: { injectType: 'lazyAutoStyleTag' } },
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader',
				],
			},
			{
				test   : /\.svg$/i,
				issuer : /\.[jt]sx?$/,
				use    : [
					{ loader: '@svgr/webpack', options: { icon: true } },
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	performance: {
		hints: false,
	},
};
