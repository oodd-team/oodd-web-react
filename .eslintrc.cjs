module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'plugin:import/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.app.json', './tsconfig.node.json'],
	},
	plugins: ['@typescript-eslint', 'eslint-plugin-import'],
	settings: {
		'import/resolver': {
			typescript: {
				project: ['./tsconfig.app.json', './tsconfig.node.json'],
			},
		},
		'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
	},
	env: {
		node: true,
	},
	rules: {
		'@typescript-eslint/strict-boolean-expressions': [
			'error',
			{
				allowString: false,
				allowNumber: false,
			},
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				ts: 'never',
				tsx: 'never',
			},
		],
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal', 'index', 'type', 'parent', 'sibling', 'object'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'never',
			},
		],
		'import/no-unresolved': 'off',
		'import/export': 'off',
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'import/order': 'error',
			},
		},
	],
	ignorePatterns: ['src/**/*.test.ts', 'src/frontend/generated/*'],
};
