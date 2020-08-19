const path = require('path');

const { eslint, stylelint, stylelintSCSS } = require('./utils');

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = {
	tasks: {
		'*.{js,ts,tsx}':   eslint(pkg),
		'*.css':           stylelint(pkg),
		'*.scss':          stylelintSCSS(pkg),
		'**/package.json': [
			'pkg-ok',
		],
		'**/.travis.yml': [
			'travis lint',
		],

		/*
		 * TODO Build on prepush
		 * BODY The filenames get attached as args, no real way to do this
		 * '*': build(pkg),
		 */
	},
};
