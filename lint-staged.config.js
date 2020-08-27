const path = require('path');

const { eslint, stylelint, stylelintSCSS, test } = require('./utils');

// eslint-disable-next-line import/no-dynamic-require -- Need to use the user's package.json, not mine
const pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = {
	'*':                        () => test(pkg), // needs to be function to ignore filenames
	'*.{js,ts,tsx}':            eslint(pkg).map((cmd) => `${cmd} --fix`),
	'*.css':                    stylelint(pkg).map((cmd) => `${cmd} --fix`),
	'*.scss':                   stylelintSCSS(pkg).map((cmd) => `${cmd} --fix`),
	'*.{png,jpeg,jpg,gif,svg}': [
		'imagemin-lint-staged',
	],
	'**/!(package|package-lock).json': [
		'fixjson --write ',
		'jsonlint --in-place --quiet',
	],
	'**/package.json': [
		'sort-package-json',
	],
	'**/.travis.yml': [
		'travis lint',
	],
};
