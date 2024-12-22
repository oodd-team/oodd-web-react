module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
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
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
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
				'newlines-between': 'always',
				pathGroups: [
					{
						pattern: 'react*',
						group: 'builtin',
						position: 'before',
					},
					{
						pattern: '@components/**/dto',
						group: 'type',
					},
					{
						pattern: '@styles/**',
						group: 'internal',
						position: 'before',
					},
					{
						pattern: '@assets/**',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@components/Icons/**',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@components/**',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '../**/dto',
						group: 'type',
						position: 'after',
					},
					{
						pattern: './**/dto',
						group: 'type',
						position: 'after',
					},
					{
						pattern: '../**/index',
						group: 'parent',
						position: 'before',
					},
					{
						pattern: './**/index',
						group: 'parent',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['react*'],
			},
		],
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
