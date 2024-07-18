module.exports = {
	extends        : ['@cogoport/eslint-config/react-typescript'],
	ignorePatterns : ['dist/**/*', '!.stylelintrc.js', 'src/scripts/**/*'],
	parserOptions  : { project: './tsconfig.json', tsconfigRootDir: __dirname },
	root           : true,
};
