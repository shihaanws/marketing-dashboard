import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  json: {
    stringify: false,
  },

  build: {
    // Use default esbuild minification 
    minify: true,

    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-redux", "@reduxjs/toolkit"],
          "vendor-charts": ["recharts"],
          "vendor-window": ["react-window"],
        },
      },
    },

    chunkSizeWarningLimit: 2000,
    sourcemap: true,
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-redux", "@reduxjs/toolkit", "recharts", "react-window"],
  },

  server: {
    open: true,
    port: 5173,
    cors: true,
  },
});
