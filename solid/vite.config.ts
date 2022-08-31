import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Urly',
        description: 'The Royal Game of Ur',
        icons: [
          {
            src: '/favicon.ico',
            type: 'image/x-icon',
            sizes: '48x48',
          },
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/',
        display: 'fullscreen',
        theme_color: '#5D4954',
        background_color: '#E6DBD0',
        orientation: 'landscape',
      },
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/ws': {
        target: 'ws://127.0.0.1:42069',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
