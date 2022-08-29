import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    proxy: {
      '/ws': {
        target: 'ws://127.0.0.1:42069',
        changeOrigin: true,
      }
    }
  },
  build: {
    target: 'esnext',
  },
});
