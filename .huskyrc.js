const path = require('path');

const { build, test } = require('./utils');

// eslint-disable-next-line import/no-dynamic-require -- Need to use the user's package.json, not mine
const pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = {
	hooks: {
		'pre-commit': `lint-staged --config ${path.join(__dirname, 'lint-staged.config.js')}`,
		'pre-push':   []
			.concat(test(pkg))
			.concat(build(pkg))
			.join(' && '),
	},
};
