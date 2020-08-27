function packagePath(name) {
	return require.resolve(name)
		.replace(
			new RegExp(`^(.*node_modules/${name}).*$`, 'u'),
			'$1'
		);
}

function test(pkg) {
	if (!pkg.scripts || !pkg.scripts.test) {
		return [];
	}

	return ['npm test'];
}

function eslint(pkg) {
	if (!pkg.eslintConfig || !pkg.eslintConfig.extends) {
		return [];
	}
	const configPath = packagePath(`eslint-config-${pkg.eslintConfig.extends}`);

	return [
		`eslint --resolve-plugins-relative-to ${configPath} --ignore-pattern '!.*' --color --report-unused-disable-directives`,
	];
}

function stylelint(pkg) {
	if (!pkg.stylelint || !pkg.stylelint.extends) {
		return [];
	}

	return [
		'stylelint --color --allow-empty-input --report-needless-disables',
	];
}

function stylelintSCSS(pkg) {
	return stylelint(pkg).map((cmd) => `${cmd}  --syntax=scss`);
}

module.exports = {
	eslint,
	packagePath,
	stylelint,
	stylelintSCSS,
	test,
};
