/* eslint-disable unicorn/prefer-spread -- TODO Not sure if it's supported */
const path = require('path');

const { build, eslint, stylelint, stylelintJS, stylelintSCSS, test } = require('./utils');

// eslint-disable-next-line import/no-dynamic-require -- Need to use the user's package.json, not mine
const pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = {
	'*': () => [] // needs to be function to ignore filenames
		.concat(test(pkg))
		.concat(build(pkg)),
	'*.{js,jsx,ts,tsx}': []
		.concat(eslint(pkg).map((cmd) => `${cmd} --fix`))
		.concat(stylelintJS(pkg)),
	'*.css':                           stylelint(pkg).map((cmd) => `${cmd} --fix`),
	'*.scss':                          stylelintSCSS(pkg).map((cmd) => `${cmd} --fix`),
	'*.{png,jpeg,jpg,gif,svg}':        ['imagemin-lint-staged'],
	'**/!(package|package-lock).json': ['fixjson --write ', 'jsonlint --in-place --quiet'],
	'**/package.json':                 ['sort-package-json', 'pkg-ok'],
	'**/.travis.yml':                  ['travis lint'],
};
