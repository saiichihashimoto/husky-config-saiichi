const path = require('path');

const { eslint, stylelint, stylelintSCSS } = require('./utils');

// eslint-disable-next-line import/no-dynamic-require -- Need to use the user's package.json, not mine
const pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = {
	tasks: {
		'*.{js,ts,tsx}':                   eslint(pkg),
		'*.css':                           stylelint(pkg),
		'*.scss':                          stylelintSCSS(pkg),
		'**/!(package|package-lock).json': ['jsonlint --quiet'],
		'**/package.json':                 ['pkg-ok'],
		'**/.travis.yml':                  ['travis lint'],

		/*
		 * TODO Test on prepush
		 * BODY The filenames get attached as args, no real way to do this
		 * '*': []
		 *     .concat(test(pkg))
		 *     .concat(build(pkg)),
		 */
	},
};
