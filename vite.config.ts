import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		watch: false,
		environment: 'jsdom',
		globals: true,
		reporters: ['verbose'],
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			include: ['src/**/*.ts'],
			exclude: [
				'src/**/*.constant.ts',
				'src/**/*.test.ts',
				'src/**/*.schema.ts',
				'src/**/app.d.ts',
				'src/**/__mocks__/**/*',
				'src/**/index.ts',
				'src/**/types.util.ts'
			],
			reporter: ['text', 'json', 'html'],
			all: true,
			lines: 60,
			functions: 60,
			branches: 60,
			statements: 60
		},
		setupFiles: ['src/setupTest.js']
	}
});
