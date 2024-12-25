import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

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
			'@page': path.resolve(__dirname, 'src/page'),
			'@recoil': path.resolve(__dirname, 'src/recoil'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		},
	},
});
