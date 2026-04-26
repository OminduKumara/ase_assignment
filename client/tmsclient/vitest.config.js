import { defineConfig } from 'vitest/config';
import { transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'js-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (!id.match(/\/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, { loader: 'jsx' });
      },
    },
    react(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
    include: ['src/tests/**/*.test.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
