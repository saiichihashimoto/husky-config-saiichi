const path = require('path');

const { build, eslint, stylelint, stylelintSCSS } = require('./utils');

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
		'*': build(pkg),
	},
};
