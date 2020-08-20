const path = require('path');

module.exports = {
	hooks: {
		'pre-commit': `lint-staged --config ${path.join(__dirname, 'lint-staged.config.js')}`,
		'pre-push':   `lint-prepush --config ${path.join(__dirname, 'lintprepush.config.js')}`,
	},
};
