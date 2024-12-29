import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	define: {
		'process.env': {},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@apis': path.resolve(__dirname, 'src/apis'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@config': path.resolve(__dirname, 'src/config'),
			'@context': path.resolve(__dirname, 'src/context'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@recoil': path.resolve(__dirname, 'src/recoil'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		},
	},
});
