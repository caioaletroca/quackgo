/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
			'@': path.resolve(__dirname, './src'),
		},
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts'
  },
  plugins: [mkcert(), react()],
})
