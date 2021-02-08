function packagePath(name) {
	return require.resolve(name)
		.replace(
			new RegExp(`^(.*node_modules/${name}).*$`, 'u'),
			'$1'
		);
}

function build(pkg) {
	return !pkg.scripts || !pkg.scripts.build
		? []
		: ['npm run build'];
}

function test(pkg) {
	return !pkg.scripts || !pkg.scripts.test
		? []
		: ['npm test'];
}

function eslint(pkg) {
	return !pkg.eslintConfig || !pkg.eslintConfig.extends
		? []
		: [`eslint --resolve-plugins-relative-to ${packagePath(`eslint-config-${pkg.eslintConfig.extends}`)} --ignore-pattern '!.*' --color --report-unused-disable-directives`];
}

function stylelint(pkg) {
	return !pkg.stylelint || !pkg.stylelint.extends
		? []
		: ['stylelint --color --allow-empty-input'];
}

function stylelintSCSS(pkg) {
	return stylelint(pkg).map((cmd) => `${cmd}  --syntax=scss`);
}

module.exports = {
	build,
	eslint,
	packagePath,
	stylelint,
	stylelintSCSS,
	test,
};
