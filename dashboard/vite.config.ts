import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'spa', // Enable SPA fallback for client-side routing
  define: {
    __APP_VERSION__: JSON.stringify(process.env.APP_VERSION || '0.2.1'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  server: {
    port: 2886,
    host: '0.0.0.0', // Required to be reachable from outside the container
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:2785',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
