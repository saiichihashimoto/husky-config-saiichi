const path = require('path');

module.exports = {
	hooks: {
		'pre-commit': `lint-staged --config ${path.join(__dirname, 'lint-staged.config.js')}`,
	},
};
