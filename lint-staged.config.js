const path = require('path');

const { build, eslint, stylelint, stylelintSCSS } = require('./utils');

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = {
	'*.{js,ts,tsx}':   eslint(pkg).map((cmd) => `${cmd} --fix`),
	'*.css':           stylelint(pkg).map((cmd) => `${cmd} --fix`),
	'*.scss':          stylelintSCSS(pkg).map((cmd) => `${cmd} --fix`),
	'**/package.json': [
		'sort-package-json',
	],
	'**/!(package|package-lock).json': [
		'fixjson --write',
		'jsonlint --quiet',
	],
	'*.{png,jpeg,jpg,gif,svg}': [
		'imagemin-lint-staged',
	],
	'*': () => build(pkg), // needs to be function to ignore filenames
};
