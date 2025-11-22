// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Ensure JSON files are properly handled
  json: {
    stringify: false, // Keep as JavaScript objects, not strings
  },
  
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging initially
        drop_debugger: true,
      },
    },
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
          'vendor-charts': ['recharts'],
          'vendor-window': ['react-window'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 2000, // Increased for large JSON
    // Source maps for debugging
    sourcemap: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', 'recharts', 'react-window'],
  },
  
  // Server configuration
  server: {
    open: true,
    port: 5173,
    // Add CORS headers for development
    cors: true,
  },
});