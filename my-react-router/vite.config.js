import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      '~/components': '/src/components',
      '~/pages': '/src/pages',
      '~/routes': '/src/routes',
      '~/routers': '/src/routers',
      '~/lib': '/src/lib',
    },
  },
});
