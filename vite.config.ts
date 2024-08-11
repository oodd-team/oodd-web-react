import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
		  '/api': 'http://localhost:3001',
		},
	  },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
