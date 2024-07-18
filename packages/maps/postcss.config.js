const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	plugins: [
		postcssImport,
		postcssFlexbugsFixes,
		postcssPresetEnv({
			autoprefixer: {
				flexbox: 'no-2009',
			},
			stage    : 3,
			features : {
				'custom-media-queries' : true,
				'custom-properties'    : false,
			},
		}),
		postcssNested,
	],
};
