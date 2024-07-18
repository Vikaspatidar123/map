module.exports = {
	extends     : ['@cogoport/stylelint-config'],
	ignoreFiles : ['dist/**/*', '.next/**/*', 'node_modules/**/*'],
	rules       : {
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
	},
};
